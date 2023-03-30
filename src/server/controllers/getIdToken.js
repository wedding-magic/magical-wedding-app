/**
 * TODO(developer):
 *  1. Uncomment and replace these variables before running the sample.
 */
// const url = 'https://batch-api-supervisor-vyyzo5oq3q-uw.a.run.app';

// const {GoogleAuth} = require('google-auth-library');

// function getIdTokenFromMetadataServer() {
//   const googleAuth = new GoogleAuth();
//   googleAuth.getClient().then(

//     client => {

//     return client.fetchIdToken(url)
//     }

//   ).then(
//     data => {console.log(data)}
//   ).catch(
//     err => console.log(err)
//   )

//   // Get the ID token.
//   // Once you've obtained the ID token, you can use it to make an authenticated call
//   // to the target audience.
 
//   console.log('Generated ID token.');
// }

// getIdTokenFromMetadataServer();

const filename = 'img-67f0011b-63b5-4fd4-8673-ff9dd78f4dca-2-0.png';
const stop = filename.indexOf(".") - 2;

const job_id = filename.substring(0,stop);
console.log("job_id",job_id);