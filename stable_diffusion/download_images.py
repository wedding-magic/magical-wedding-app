import os
from google.cloud import storage
import subprocess
from subprocess import getoutput
import time


def download_training_images(job_id="prang"):
    # Directories to use
    LOCAL_DOWNLOAD_DIR = "/home/tobrien6/training_images"

    # Set the name of the bucket and the prefix for the files you want to download
    bucket_name = "magical-wedding-cropped-image-output"
    prefix = "{}".format(job_id)

    # Create a client for interacting with the Cloud Storage API
    storage_client = storage.Client()

    # Get the bucket object
    bucket = storage_client.bucket(bucket_name)

    # Create a blob iterator to iterate over the blobs with the desired prefix
    blob_iterator = bucket.list_blobs(prefix=prefix)

    # Iterate over the blobs and download each one
    # Images should be named like: prang-(1).jpeg prang-(2).jpeg etc
    for i, blob in enumerate(blob_iterator):
        print("Downloading {}".format(blob.name))
        output_path = LOCAL_DOWNLOAD_DIR + "/prang-({}).jpeg".format(i)
        blob.download_to_filename(output_path)
