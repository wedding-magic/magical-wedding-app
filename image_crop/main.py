import os
from google.cloud import vision
from google.cloud import storage
from PIL import Image, ImageOps
from io import BytesIO

def detect_face(data, context):
  # Get the bucket where the file is stored
  bucket_name = data['bucket']

  # Get the file name
  file_name = data['name']

  # Create a client for the Vision API
  client = vision.ImageAnnotatorClient()

  # Get the file from the bucket
  storage_client = storage.Client()
  bucket = storage_client.get_bucket(bucket_name)
  blob = bucket.blob(file_name)

  # Create a Vision API image object from the file
  image = vision.Image()
  image.source.image_uri = f'gs://{bucket_name}/{file_name}'

  # Perform face detection
  response = client.face_detection(image=image)
  faces = response.face_annotations

  # Check if any faces were detected
  if len(faces) == 0:
    print('No faces detected')
    return 

  # Crop and resize the image around the detected face
  # Get the bounding box for the first detected face
  face = faces[0]
  vertices = [vertex for vertex in face.bounding_poly.vertices]
  left, top, right, bottom = vertices[0].x, vertices[0].y, vertices[2].x, vertices[2].y

  # Calculate the side length of the square
  side_length = max(right - left, bottom - top)

  # Calculate the top-left corner of the square
  x1 = left - (side_length - (right - left)) // 2
  y1 = top - (side_length - (bottom - top)) // 2

  # Open the image file
  image_data = blob.download_as_string()
  image = Image.open(BytesIO(image_data))

  # Check if the image is in PNG format
  if image.format == 'PNG':
      # Convert the image to JPEG format
      image = image.convert('RGB')

  # Crop around the detected face
  cropped_image = image.crop((x1, y1, x1 + side_length, y1 + side_length))

  # Apply original rotation
  cropped_image = ImageOps.exif_transpose(cropped_image)

  # Resize the cropped image to 512x512
  resized_image = cropped_image.resize((512, 512))

  # Save the resulting image to the output bucket
  output_bucket_name = 'magical-wedding-cropped-image-output'
  output_bucket = storage_client.get_bucket(output_bucket_name)
  output_file_name = f'{file_name}_cropped_and_resized.jpg'
  output_blob = output_bucket.blob(output_file_name)
  bs = BytesIO()
  resized_image.save(bs, "jpeg")
  output_blob.upload_from_string(bs.getvalue(), content_type='image/jpeg')
  
  return
