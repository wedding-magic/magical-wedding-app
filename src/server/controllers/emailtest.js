const nodemailer = require('nodemailer');
const { Storage } = require('@google-cloud/storage');
const senderAddress = 'woodlandcritterai@gmail.com';
const receiverAddress = 'steinbrookdaniel@gmail.com';
const bucketName = 'test_input_bucket29';
// const fileName = 'job-faf40662-81bf-4ad3-a51e-c84eb2317d69_0.jpg';

// Create a Storage client
const storage = new Storage();

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // your email server
    auth: {
        user: senderAddress, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: senderAddress, // sender address
    to: receiverAddress,
    subject: 'Hello', // Subject line
    text: 'Hello world!', // plain text body
    html: '<b>Hello world?</b>', // html body
    attachments: []
};

async function sendFiles(jobId) {
    // Lists files in the bucket
    console.log("jobId",jobId);
    const [files] = await storage.bucket(bucketName).getFiles({prefix: jobId}).catch(err => console.log(err));
  
    // console.log('Files:');
    files.forEach(file => {
      console.log("file",file.name);
      addAttachment(file);
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log('email sent', info.response);
        return next();
    })
  };

  function addAttachment(file) {

    // const file = storage.bucket(bucketName).file(fileName);
    
    // Create a read stream for the file
    const readStream = file.createReadStream();
    
    // Add the file as an attachment to the email
    mailOptions.attachments.push({
        filename: file.name,
        content: readStream
    });

};

const job_id = 'job-fab59855-1cfe-49f7-8e1b-0b471ed247bd';
sendFiles(job_id);






