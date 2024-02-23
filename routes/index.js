const router = require("express").Router();
const api = require("./api");
const user = require("./user");

router.use("/", user);
router.use("/api", api);

module.exports = router;
