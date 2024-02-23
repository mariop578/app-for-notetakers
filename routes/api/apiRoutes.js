const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
});

module.exports = router;
