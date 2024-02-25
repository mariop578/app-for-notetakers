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

router.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const notes = JSON.parse(data);
    const newArr = notes.filter((note) => note.id !== id);
    res.json(newArr);
    fs.writeFile("./db/db.json", JSON.stringify(newArr), (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log("Deleted Succesfully");
    });
  });
});

module.exports = router;

// try {
//   const id = req.params.id;
//   const noteData = fs.readFile("./db/db.json", "utf-8", (err, data) => {});
//   const notes = JSON.parse(noteData);
//   const newArr = notes.filter((note) => note.id !== id);
//   console.log(noteData);
//   // fs.writeFile(
//   //   "./db/db.json",
//   //   JSON.stringify(newArr, null, 2),
//   //   "utf-8",
//   //   (err, data) => {
//   //     if (err) {
//   //       console.log(err);
//   //     }
//   //     res.json(newArr);
//   //   }
//   // );
// } catch (err) {
//   res.status(500).json(err);
// }
