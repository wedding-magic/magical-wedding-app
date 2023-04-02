# magical_wedding
photo magic

# to start app and dev server for testing file download
npm install

npm run start-dev

navigate to localhost:8080

the test server will run on localhost:3000

# to test file upload

download a service access key from google cloud project

export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"

download tusd binary from https://github.com/tus/tusd/releases/tag/v1.10.0

open a new terminal window, run tusd binary (see https://github.com/tus/tusd/blob/master/docs/usage-binary.md.)

TUSD_FILE_PATH -gcs-bucket=test_input_bucket29 --hooks-http http://localhost:8080/api/upload

# to connect to database

download cloud sql proxy binary


```./cloud-sql-proxy --credentials-file public/stable-diffusion-372315-b45b215dfa32.json stable-diffusion-372315:us-west1:magical-wedding ```

