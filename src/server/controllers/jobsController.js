const db = require('../db/connect-pg-cloudrun.js');
const fetch = require('node-fetch');
const {GoogleAuth} = require('google-auth-library');
require('dotenv').config();


//controller to handle entering new jobs in database and triggering batch Api to run jobs


const jobsController = {};
const baseUrl2 = 'https://batch-api-supervisor-vyyzo5oq3q-uw.a.run.app';


//sets job id in json body for post request to batch api

function setJobId(str,id) {
  return str.replace('"JOB-TEST1234"',`"${id}"`);
}

//body for json post request to trigger batch api. You can manually adjust TEXT_ENC_TRAIN_STEPS and UNET_TRAIN_STEPS
//as desired

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
                                "UNET_TRAIN_STEPS": "1500"
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
}`;

//method for adding job entry to database with user email, gender from landing page form. sets the uuid from database
//row to the variable job_id which is passed back to the frontend to set the url param job_id

jobsController.addJob = (req, res, next) => {

  const { email } = req.body;
  const { gender } = req.body;
  console.log('gender', gender);

  let obj;

  if (gender === 'M' || gender === 'm') {
    obj = {1:4,5:2,6:4,7:1,8:2,9:1,10:2,11:2,13:2};
  }
  else if (gender === 'F' || gender === 'f') {
    obj = {1:4,2:2,3:3,4:2,6:4,7:1,8:1,9:1,12:2};
  }
  else {
    obj = {1:4,2:1,3:2,4:1,5:2,6:4,8:1,9:1,10:1,11:1,12:2};
  }

  console.log('obj',obj);

  // const obj = {5:1,6:3,7:1,8:1,9:1,10:3,11:1,12:3};

  const image_generation_parameters = JSON.stringify(obj);

  const values = [
    email,
    image_generation_parameters
  ];

  const qry = 'INSERT INTO jobs(user_email, image_generation_parameters) VALUES($1,$2) RETURNING *';

  db.query(qry,values)
    .then(data => 
    {
      res.locals.newJob = data;
      return next();
    })
    .catch(
      err => {console.log(err);
      });


};

//function to trigger batch api using json body as defined above, as well as job_id from request body


jobsController.startBatch2 = async (req, res, next) => {

  console.log('req.body',req.body);

  const { job_id } = req.body;
  const config = setJobId(body, job_id);

  console.log('config', config);
  console.log('job_id', job_id);

  if (job_id === null){

    return res.status(400).json('Bad request');

  }

  //function to get ID token for auth header in POST request to batch api manager service

  getIdTokenFromMetadataServer(baseUrl2);
   
  function getIdTokenFromMetadataServer(url) {
    const googleAuth = new GoogleAuth();
    googleAuth.getClient().then(
      
      client => {
      
        return client.fetchIdToken(url);
      }
      
    ).then(
      data => {
            
        console.log(data);
        triggerBatch(data);
      })
      .catch(
        err => console.log(err)
      );
       
    console.log('Generated ID token.');
  }


  //send POST request to trigger
   
  function triggerBatch(authToken){ fetch(baseUrl2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken
    },
    body: config
  })
    .then(
      data => {res.locals.batchResponse = data;}
    )
    .then(
      () => {
        console.log('sent request');
        return next();
      }
    )
    .catch(err => {console.log(err);});
  }};

module.exports = jobsController;