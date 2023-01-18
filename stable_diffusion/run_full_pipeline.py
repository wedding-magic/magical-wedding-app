import os
import io
import sys
import time
import base64
import requests
import sqlalchemy
from google.cloud import storage
import subprocess
from download_images import download_training_images
from google.cloud.sql.connector import Connector

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/tobrien6/creds/stable-diffusion-372315-67085e37ee69.json"
JOB_ID = os.environ["JOB_ID"]
TEXT_ENC_TRAIN_STEPS = os.environ["TEXT_ENC_TRAIN_STEPS"]
UNET_TRAIN_STEPS = os.environ["UNET_TRAIN_STEPS"]


def train_textenc():
    print("Training text encoder")
    command = [
        'sudo', 'docker', 'run', '--gpus=all', '--ipc=host',
        '-v', '/home/tobrien6/:/content',
        'diffusers:latest',
        'accelerate', 'launch', '--mixed_precision', 'fp16',
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
        '--max_train_steps={}'.format(TEXT_ENC_TRAIN_STEPS)
    ]
    subprocess.run(command, stderr=sys.stderr, stdout=sys.stdout)


def train_unet():
    print("Training unet")
    command = [
        'sudo', 'docker', 'run', '--gpus=all', '--ipc=host',
        '-v', '/home/tobrien6/:/content',
        'diffusers:latest',
        'accelerate', 'launch', '--mixed_precision', 'fp16',
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
        '--max_train_steps={}'.format(UNET_TRAIN_STEPS)
    ]
    subprocess.run(command, stderr=sys.stderr, stdout=sys.stdout)


def save_model_ckpt():
    print("Saving checkpoint")
    command = [
        'sudo', 'docker', 'run', '--gpus=all', '--ipc=host',
        '-v', '/home/tobrien6/:/content', 'diffusers:latest',
        'python', '/content/convertosd.py'
    ]
    subprocess.run(command, stderr=sys.stderr, stdout=sys.stdout)


def save_model_to_cloud(job_id):
    # Create a client object
    client = storage.Client()

    # Get the bucket that you want to upload the file to
    bucket = client.get_bucket('magical-wedding-trained-model-output-bucket')

    # Create a blob object from the file
    blob = bucket.blob(f'model-{job_id}.ckpt')

    # Read the contents of the file and then upload
    with open('/home/tobrien6/checkpoint/model.ckpt', 'rb') as f:
        contents = f.read()
        blob.upload_from_string(contents)

    print('File uploaded to Google Cloud Storage')

download_training_images("job-" + JOB_ID)
train_textenc()
train_unet()
save_model_ckpt()
save_model_to_cloud(JOB_ID)

####### IMAGE GENERATION #######
# 1) Query Jobs table to get prompts and number of images to generate
# 2) Query Prompts table to get relevant information
# 3) Subprocess.Popen command to launch automatic1111 docker container
#    in background hosting API for image generation
# Docs: https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API
# 4) Wait a period of time, checking if the server is running, continue when it is
# 5) Submit image generation requests according to prompt details
# 6) For each generated image, upload it as <job_id>-<prompt_id>-<num>.jpg
# 7) Submit docker stop command (not strictly necessary as job will shutdown server)

# initialize Connector object
connector = Connector()

# function to return the database connection
# TODO Remove hardcoding of password and load from credentials file
def getconn():
    conn = connector.connect(
        "stable-diffusion-372315:us-west1:magical-wedding",
        "pg8000",
        user="ds",
        password="Le_NZT--m&9x@Q@N",
        db="postgres"
    )
    return conn

# create connection pool
pool = sqlalchemy.create_engine(
    "postgresql+pg8000://",
    creator=getconn,
)

def img_gen_data(prompt_text="prang", batch_size=1, steps=50, cfg=7, 
                 sampler="Euler a", height=512, width=512):
    return {
        "prompt": prompt_text,
        "steps": steps,
        "cfg": cfg,
        "sampler": sampler,
        "height": height,
        "width": width,
        "batch_size": batch_size
    }

def save_image_to_cloud(byte_string, job_id, prompt_id, image_num):
    # Create a client object
    client = storage.Client()

    # Get the bucket that you want to upload the file to
    bucket = client.get_bucket('magical-wedding-sd-output-images-bucket')

    # Create a blob object from the file
    filename = 'img-{}-{}-{}.png'.format(job_id, prompt_id, image_num)
    blob = bucket.blob(filename)

    blob.upload_from_string(byte_string)
    print('uploaded {}'.format)

# get job data
with pool.connect() as db_conn:
    job_data = db_conn.execute("""
        SELECT * FROM jobs
        WHERE _id = '{}'""".format(JOB_ID)).mappings().all()

print(job_data)

image_gen_params = job_data[0]['image_generation_parameters']
prompts_to_fetch = ",".join(image_gen_params.keys())

with pool.connect() as db_conn:
    prompt_data = db_conn.execute("""
        SELECT * FROM prompts
        WHERE _id IN ({})
    """.format(prompts_to_fetch)).mappings().all()

print(prompt_data)

# launch automatic1111 API server
# DOCS: https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API
lauch_automatic1111_cmd = [
    'sudo', 'docker', 'run', '--gpus=all', '--ipc=host',
    '-v', '/home/tobrien6/:/content',
    '-p', '7860:7860',
    'automatic1111:latest',
    'python', '/content/sd/stable-diffusion-webui/webui.py',
    '--api',
    '--listen',
    '--disable-safe-unpickle',
    '--no-half-vae',
    '--enable-insecure-extension-access',
    '--ckpt=model.ckpt',
    '--ckpt-dir=/content/checkpoint/',
    '--xformers'
]

subprocess.Popen(
    lauch_automatic1111_cmd,
    stderr=sys.stderr,
    stdout=sys.stdout)

wait = 0
while wait >= 0:
    try:
        resp = requests.get(url='http://127.0.0.1:7860/docs')
        assert resp.status_code == 200
        wait = -1
        print("automatic1111 server up")
    except:
        print("waiting for automatic1111 server")
        time.sleep(5)
        wait += 1
        if wait > 50:
            raise Exception("Automatic1111 API not starting")

for image_gen_batch in image_gen_params.items():
    prompt_id, batch_size = image_gen_batch
    prompt = [p for p in prompt_data if p['_id'] == int(prompt_id)][0]
    prompt = dict(prompt.items())  # convert from sqlalchemy row object to native python dict
    data = img_gen_data(prompt_text=prompt['prompt_text'],
                       steps=prompt['sd_parameters']['steps'],
                       cfg=prompt['sd_parameters']['cfg'],
                       sampler=prompt['sd_parameters']['sampler'],
                       height=prompt['sd_parameters']['size'][1],
                       width=prompt['sd_parameters']['size'][0],
                       batch_size=batch_size)
    response = requests.post(url='http://127.0.0.1:7860/sdapi/v1/txt2img', json=data)
    r = response.json()
    for i, im in enumerate(r['images']):
        bytes = base64.b64decode(im.split(",",1)[0])
        save_image_to_cloud(bytes, JOB_ID, prompt_id, i)
