import express from "express";
import fs from "fs";
import path from "path";
//const express = require('express')
const app = express();
const port = 3000;
// const widths: number[] = [];
// const heights: number[] = [];
const rootFolder: string = path.resolve(__dirname);
const views = rootFolder + path.normalize("/views/");
//const originalImgPath = rootFolder + path.normalize("/public/img/original/");
//const file = fs.readdirSync(originalImgPath)[0];

app.use(express.static(rootFolder));

const middleware = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  
};


app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(rootFolder + path.normalize("/public/displayImage.html"));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
