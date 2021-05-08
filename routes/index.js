const router = require("express").Router();
const dataController = require("../controllers/dataController");

router.get("/", dataController.home);
router.get("/api/data",dataController.index,dataController.respondJSON);
router.get("/api/data/:id", dataController.read, dataController.respondJSON);
router.post("/api/data/create", dataController.new,dataController.respondJSON);
router.put("/api/data/:id/update", dataController.update, dataController.respondJSON);
router.delete("/api/data/:id/delete", dataController.delete, dataController.respondJSON);
router.use(dataController.notFoundJSON)
router.use(dataController.errorJSON);

module.exports = router;