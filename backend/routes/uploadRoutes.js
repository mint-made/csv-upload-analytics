import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import { genStatisticString } from '../utils/analytics.js';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `csv-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  console.log(file);
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('CSV only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('csvFile'), (req, res) => {
  const numbersArr = [];

  /**Creates a readstream, so the data can be read and piped to
   *  the csv function (csv-parser package), from which we can write
   * the data to the numberArr variable */
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      numbersArr.push(Number(row.number));
    })
    .on('end', () => {
      res.send(genStatisticString(numbersArr));
    });
});

export default router;
