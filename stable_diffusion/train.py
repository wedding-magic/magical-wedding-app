import os
from google.cloud import storage
import subprocess
from download_images import download_training_images

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/tobrien6/creds/stable-diffusion-372315-67085e37ee69.json"


def train_textenc():
    print("Training text encoder")
    command = [
        'sudo', 'docker', 'run', '-it', '--gpus=all', '--ipc=host',
        '-v', '/home/tobrien6/:/content',
        'diffusers:latest',
        'accelerate', 'launch',
        '/content/diffusers/examples/dreambooth/train_dreambooth.py',
        '--image_captions_filename',
        '--train_text_encoder',
        '--dump_only_text_encoder',
        '--pretrained_model_name_or_path=/content/stable-diffusion-v1-5',
        '--instance_data_dir=/content/training_images',
        '--output_dir=/content/model_trained_output',
        '--instance_prompt=""',
        '--resolution=512',
        '--mixed_precision=fp16',
        '--train_batch_size=1',
        '--gradient_accumulation_steps=1',
        '--gradient_checkpointing',
        '--use_8bit_adam',
        '--learning_rate=2e-6',
        '--lr_scheduler=polynomial',
        '--lr_warmup_steps=0',
        '--max_train_steps=10'
    ]
    subprocess.run(command)


def train_unet():
    print("Training unet")
    command = [
        'sudo', 'docker', 'run', '-it', '--gpus=all', '--ipc=host',
        '-v', '/home/tobrien6/:/content',
        'diffusers:latest',
        'accelerate', 'launch',
        '/content/diffusers/examples/dreambooth/train_dreambooth.py',
        '--image_captions_filename',
        '--train_only_unet',
        '--pretrained_model_name_or_path=/content/stable-diffusion-v1-5',
        '--instance_data_dir=/content/training_images',
        '--output_dir=/content/model_trained_output',
        '--instance_prompt=""',
        '--resolution=512',
        '--mixed_precision=fp16',
        '--train_batch_size=1',
        '--gradient_accumulation_steps=1',
        '--gradient_checkpointing',
        '--use_8bit_adam',
        '--learning_rate=2e-6',
        '--lr_scheduler=polynomial',
        '--lr_warmup_steps=0',
        '--max_train_steps=10'
    ]
    subprocess.run(command)


def save_model_ckpt():
    print("Saving checkpoint")
    command = [
        'sudo', 'docker', 'run', '-it', '--gpus=all', '--ipc=host',
        '-v', '/home/tobrien6/:/content', 'diffusers:latest',
        'python', '/content/convertosd.py'
    ]
    subprocess.run(command)


def save_model_to_cloud():
    # Create a client object
    client = storage.Client()

    # Get the bucket that you want to upload the file to
    bucket = client.get_bucket('magical-wedding-trained-model-output-bucket')

    # Create a blob object from the file
    blob = bucket.blob('model.ckpt')

    # Read the contents of the file and then upload
    with open('/home/tobrien6/checkpoint/model.ckpt', 'rb') as f:
        contents = f.read()
        blob.upload_from_string(contents)

    print('File uploaded to Google Cloud Storage')

download_training_images()
train_textenc()
train_unet()
save_model_ckpt()
save_model_to_cloud()