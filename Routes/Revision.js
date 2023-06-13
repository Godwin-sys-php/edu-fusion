const router = require('express').Router();

const validatorRevision = require("../Middlewares/Validators/validatorRevision")
const validatorChat = require("../Middlewares/Validators/validatorChat")
const authUser = require("../Middlewares/Auth/authUser")
const authUserForRevision = require("../Middlewares/Auth/authUserForRevision")
const existRevision = require("../Middlewares/Exists/existRevision")
const creditCheck = require("../Middlewares/Exists/creditCheck")

const revisionCtrl = require("../Controllers/Revision")

router.post("/start", authUser, creditCheck, validatorRevision, revisionCtrl.startRevisionSession)
router.post("/:idRevision/chat", existRevision, authUserForRevision, validatorChat, revisionCtrl.sendChat)

router.get("/:idRevision", existRevision, authUserForRevision, revisionCtrl.getOne)
router.get("/", authUser, revisionCtrl.getAll)

router.delete("/:idRevision", existRevision, authUserForRevision, revisionCtrl.deleteOne)

module.exports = router;
