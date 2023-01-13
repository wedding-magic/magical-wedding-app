const db = require('../db/connect-pg');
const fetch = require('node-fetch');
const {GoogleAuth} = require('google-auth-library');

/**
* Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
* this library will automatically choose the right client based on the environment.
*/
// async function main() {
//   const auth = new GoogleAuth({
//     scopes: 'https://www.googleapis.com/auth/cloud-platform'
//   });
//   const client = await auth.getClient();
//   const projectId = await auth.getProjectId();
//   const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
//   const res = await client.request({ url });
//   console.log(res.data);
// }

// main().catch(console.error);

const jobsController = {};

const baseUrl = 'https://batch.googleapis.com/v1/projects/stable-diffusion-372315/locations/us-west1/jobs?job_id=';

function setJobId(str,id) {
    return str.replace('"JOB-TEST1234"',`"${id}"`);
}

const body = `{
    "taskGroups": [
        {
            "taskSpec": {
                "runnables": [
                    {
                        "script": {
                            "text": "/home/tobrien6/venv/bin/python /home/tobrien6/train.py"
                        },
                        "environment": {
                            "variables": {
                                "JOB_ID": "JOB-TEST1234"
                            }
                        }
                    }
                ],
                "computeResource": {
                    "cpuMilli": 4000,
                    "memoryMib": 15000
                }
            }
        }
    ],
    "allocationPolicy": {
        "instances": [
            {
                "instanceTemplate": "stable-diffusion-test-instance-template-3"
            }
        ]
    },
    "logsPolicy": {
        "destination": "CLOUD_LOGGING"
    }
}`

jobsController.addJob = (req, res, next) => {

    // const {user_email, image_generation_parameters} = req.body;
    // console.log("reachedHere");
    // console.log("prompt_id",req.body.prompt_id);

    const {email, prompt_id, count_images} = req.body;

    const obj = {};
    obj[prompt_id] = count_images;

    const image_generation_parameters = JSON.stringify(obj);

    const values = [
        email,
        image_generation_parameters
    ];

    const qry = `INSERT INTO jobs(user_email, image_generation_parameters) VALUES($1,$2) RETURNING *`;

    db.query(qry,values)
    .then(data => 
        {
            res.locals.newJob = data;
            return next();
        })
    .catch(
            err => {console.log(err)
            });


};

// jobsController.checkJobs = async (req, res, next) => {

//     const { job_id } = res.locals;



// }

jobsController.startBatch = async (req, res, next) => {

    const { job_id } = res.locals;
    const config = setJobId(body, job_id);
    const url = baseUrl + job_id;

    console.log("config", config);
    console.log("job_id", job_id);



    // async function main() {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  });
  auth.getClient().then(
    client => {
        return client.request({ url: url, method: 'POST', 
        headers: {'Content-Type': 'application/json'}, data: config });
    })
    .then(
      data => {res.locals.batchResponse = data}
    )
    .then(
        () => {
            console.log("sent request")
            return next();
        }
    )
    .catch(err => {console.log(err)})
//   const projectId = await auth.getProjectId();
//   const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
//   const res = await client.request({ url: url, method: 'POST', 
//   headers: {'Content-Type': 'application/json'}, data: config });
//   console.log(res.data);
// }

// main().catch(console.error);

    // fetch(url,{
    //     method: 'post',
    //     body: config,
    //     headers: {'Content-Type': 'application/json'}

    // })
    // .then(
    //     data => data.json()
    // )
    // .then(
    //   data => {res.locals.batchResponse = data}
    // )
    // .then(
    //     () => {
    //         console.log("sent request")
    //         return next();
    //     }
    // )
    // .catch(err => {console.log(err)})

};

module.exports = jobsController;