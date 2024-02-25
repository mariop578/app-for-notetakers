const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
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

router.post("/notes", async (req, res) => {
  try {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const notes = JSON.parse(data);
        const newNote = {
          id: uuidv4(),
          title: req.body.title,
          text: req.body.text,
        };
        notes.push(newNote);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(notes, null, 2),
          "utf8",
          (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(data);
          }
        );
        res.status(201).json(newNote);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.delete("/notes/:id", (req, res) => {});

module.exports = router;
