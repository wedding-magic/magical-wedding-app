const tusHooksController = {};
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'test_input_bucket29';

tusHooksController.renameFile = (req, res, next) => {
    console.log('renameFile invoked');

    if (req.headers['hook-name'] === 'post-finish') {


    console.log("req.body",req.body);

    const currKey = req.body.Upload.Storage.Key;
    const newKey = req.body.Upload.MetaData.filename;

    storage.bucket(bucketName).file(currKey).move(newKey).then(
        () => {return next();}
    )
    .catch(err => console.log(err));
    }
    else {
        return next();
    }

};

module.exports = tusHooksController;