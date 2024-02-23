const router = require("express").Router();

const apiRoutes = require("./apiRoutes.js");

router.use("/api", apiRoutes);

module.exports = router;
