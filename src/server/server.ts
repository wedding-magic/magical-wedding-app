import { PollingWatchKind } from "typescript";

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;


const directoryPath = path.join(__dirname, '/../../public/data');
const linkArray: any[] = [];
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err: any, files: any) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file: any) {
        // Do whatever you want to do with the file
        console.log(file);
        linkArray.push(file); 
    });
});





const filePath = path.join(__dirname,'/../../public/pic.png');



const params = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'image/png', 'Content-Disposition': 'attachment', 'filename': 'picture.png'};


//for testing file download component
// app.use('/static',express.static('/../../public/data'));
// app.use(cors());

app.get('/images', (req: any, res: any) => {res.set(params);
    res.json(linkArray)});

app.get("/", (req: any, res: any) => {
    res.set(params);
    res.status(200).sendFile(filePath);
});

// app.get('/images', (req: any, res: any) => res.json(linkArray));

// app.use(express.static('public/data'));


app.listen(port, () => {
    console.log(`your server has been started at http://localhost:${port}`);
});