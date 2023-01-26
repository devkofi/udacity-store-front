import express from "express";
import fs from "fs";
import path from "path";
//const express = require('express')
const app = express();
const port = 3000;
// const widths: number[] = [];
// const heights: number[] = [];
const rootFolder: string = path.resolve(__dirname);
const optimizedImgPath = rootFolder + path.normalize("/public/img/optimized/");
const originalImgPath = rootFolder + path.normalize("/public/img/original/");
const file = fs.readdirSync(originalImgPath)[0];
let accessibleFile = "";

app.use(express.static(rootFolder));

const processImage = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  
};


app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(rootFolder + path.normalize("/public/displayImage.html"));
});

app.use(processImage);

app.get("/api/images", (req: express.Request, res: express.Response) => {
  try {
    console.log("AccessibleFile: " + accessibleFile);

    const display = async (): Promise<void> => {
      const myPromise = new Promise((resolve) => {
        resolve(
          setTimeout(() => {
            res.sendFile(accessibleFile);
          }, 100)
        );
      });
      await myPromise;
    };

    display();
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
