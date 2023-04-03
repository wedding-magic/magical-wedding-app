const db = require('../db/connect-pg-cloudrun.js');
const fetch = require('node-fetch');
const {GoogleAuth} = require('google-auth-library');
require('dotenv').config();


const jobsController = {};

const baseUrl2 = 'https://batch-api-supervisor-vyyzo5oq3q-uw.a.run.app';

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
                            "text": "/home/tobrien6/venv/bin/python /home/tobrien6/run_full_pipeline.py"
                        },
                        "environment": {
                            "variables": {
                                "JOB_ID": "JOB-TEST1234",
                                "TEXT_ENC_TRAIN_STEPS": "130",
                                "UNET_TRAIN_STEPS": "1300"
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
                "instanceTemplate": "stable-diffusion-instance-template-4"
            }
        ]
    },
    "logsPolicy": {
        "destination": "CLOUD_LOGGING"
    }
}`

jobsController.addJob = (req, res, next) => {

    const { email } = req.body;
    const { gender } = req.body;
    console.log("gender", gender);

    let obj;

    if (gender === "M" || "m") {
        obj = {5:1,6:4,7:1,8:2,9:1,10:2,11:2,12:2}
    }
    else if (gender === "F" || "f") {
        obj = {2:2,3:2,4:2,6:4,7:1,8:1,9:1,12:2 }
    }
    else {
        obj = {2:1,3:2,4:1,5:1,6:4,8:1,9:1,10:1,11:1,12:2}
    };

    // const obj = {5:1,6:3,7:1,8:1,9:1,10:3,11:1,12:3};

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


jobsController.startBatch2 = async (req, res, next) => {

    console.log("req.body",req.body);

    const { job_id } = req.body;
    const config = setJobId(body, job_id);

    console.log("config", config);
    console.log("job_id", job_id);

    if (job_id === null){

        return res.status(400).json('Bad request');

    }

    getIdTokenFromMetadataServer(baseUrl2);
   
    function getIdTokenFromMetadataServer(url) {
        const googleAuth = new GoogleAuth();
        googleAuth.getClient().then(
      
          client => {
      
          return client.fetchIdToken(url)
          }
      
        ).then(
          data => {
            
            console.log(data);
            triggerBatch(data);
        })
        .catch(
          err => console.log(err)
        )
       
        console.log('Generated ID token.');
      }



   
   function triggerBatch(authToken){ fetch(baseUrl2, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        },
        body: config
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
}};

module.exports = jobsController;