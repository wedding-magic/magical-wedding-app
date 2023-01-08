const db = require('../db/connect-pg');

const jobsController = {};

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


}

module.exports = jobsController;