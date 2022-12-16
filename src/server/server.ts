import { PollingWatchKind } from "typescript";

const express = require('express');
const path = require('path');
const app = express();


const port = 3000;

const filePath = path.join(__dirname,'/../../public/pic.png');
const params = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'image/png', 'Content-Disposition': 'attachment', 'filename': 'picture.png'};


//for testing file download component

app.get("/", (req: any, res: any) => {
    res.set(params);
    res.status(200).sendFile(filePath);
});


app.listen(port, () => {
    console.log(`your server has been started at http://localhost:${port}`);
});