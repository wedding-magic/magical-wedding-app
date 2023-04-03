// const tusHooksController = {};
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();
// const bucketName = 'magical-wedding-bucket-1';

// tusHooksController.renameFile = (req, res, next) => {
//     console.log('renameFile invoked');

//     if (req.headers['hook-name'] === 'post-finish') {


//     console.log("req.body",req.body);

//     const currKey = req.body.Upload.Storage.Key;
//     const newKey = req.body.Upload.MetaData.filename;

//     res.locals.job_id = newKey.substring(0,newKey.indexOf("_"));

//     console.log("res.locals.job_id",res.locals.job_id);

//     if (req.body.Upload.MetaData.filetype !== 'image/jpeg') {
//         storage.bucket(bucketName).file(currKey).delete().then(
//             () => {console.log("deleted");
//             return next();}
//         )
//         .catch(err => console.log(err))
//     }

//     else {

//     storage.bucket(bucketName).file(currKey).move(newKey).then(
//         () => {return next();}
//     )
//     .catch(err => console.log(err));
//     }
// }

//     else {
//         return res.sendStatus(200);
//     }

// };

// module.exports = tusHooksController;