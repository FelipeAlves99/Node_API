const express = require("express");
const router = express.Router();
const controller = require("../controllers/product");

router.get("/", (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.2",
    });
});

router.post("/", controller.post);

router.put("/:id", controller.put);

router.delete("/", controller.delete);

module.exports = router;
