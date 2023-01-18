# 1) Query Jobs table to get prompts and number of images to generate
# 2) Query Prompts table to get relevant information
# 3) Subprocess.Popen command to launch automatic1111 docker container
#    in background hosting API for image generation
# 4) Wait a period of time, checking if the server is running, continue when it is
# 5) Submit image generation requests according to prompt details
# 6) For each generated image, upload it as <job_id>-<prompt_id>-<num>.jpg
# 7) Submit docker stop command (not strictly necessary as job will shutdown server)

import os
import sqlalchemy
from google.cloud.sql.connector import Connector

# TODO Remove hardcoding of password and load from credentials file

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/tobrien6/creds/stable-diffusion-372315-67085e37ee69.json"

# initialize Connector object
connector = Connector()

# function to return the database connection
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

with pool.connect() as db_conn:
    db_conn.execute("DELETE FROM jobs WHERE _id = '146cd4cc-3a0b-4a7f-bc59-dd40570381a5'")

create_test_job = """
   INSERT INTO jobs (_id, user_email, image_generation_parameters,
       raw_images_path, cropped_images_path, finetuned_model_path,
       output_images_path)
   VALUES ('146cd4cc-3a0b-4a7f-bc59-dd40570381a5', 'test@test.com', '{"2": 1, "3":2}',
           'test/imgs/path', 'cropped/imgs/path', 'model/path', 'output/imgs/path')
   ON CONFLICT (_id) DO NOTHING;
"""

with pool.connect() as db_conn:
    db_conn.execute(create_test_job)

with pool.connect() as db_conn:
    db_conn.execute("DELETE FROM prompts")

prompt1 = "Beautiful, young prang, cybernetic, cyberpunk, detailed gorgeous face, flowing hair, vaporwave aesthetic, synthwave , digital painting, artstation, concept art, smooth, sharp focus, illustration, art by artgerm and greg rutkowski and alphonse mucha"
prompt2 = "Beautiful anime painting of solarpunk prang, by tim okamura, victor nizovtsev, greg rutkowski, noah bradley. trending on artstation, 8k, masterpiece, graffiti paint, fine detail, full of color, intricate detail, golden ratio illustration"

create_test_prompts = """
    INSERT INTO prompts (_id, prompt_text, SD_parameters, sample_images_path)
    VALUES
     (2,
     '{}',
     '{{"steps": 50, "size": [512,512], "sampler": "Euler a", "cfg": 7}}',
     'magical-wedding-sd-output-images-bucket'),
     (3,
     '{}',
     '{{"steps": 50, "size": [512,768], "sampler": "DPM2 a Karras", "cfg": 7}}',
     'magical-wedding-sd-output-images-bucket')
     ON CONFLICT (_id) DO NOTHING;
""".format(prompt1, prompt2)

with pool.connect() as db_conn:
    db_conn.execute(create_test_prompts)

with pool.connect() as db_conn:
    prompt_data = db_conn.execute("""
        SELECT * FROM prompts""").mappings().all()

print(prompt_data)

