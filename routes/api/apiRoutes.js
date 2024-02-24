const router = require("express").Router();
const { json } = require("express");
const fs = require("fs");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }
    const cleanData = JSON.parse(data);
    console.log(cleanData);
    res.send(cleanData);
  });
});

router.post("/notes", (req, res) => {});

module.exports = router;
