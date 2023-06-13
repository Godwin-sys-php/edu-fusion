const router = require('express').Router();

const validatorUser = require("../Middlewares/Validators/validatorUser")
const authUserSecured = require("../Middlewares/Auth/authUserSecured")
const authUser = require("../Middlewares/Auth/authUser")

const userCtrl = require("../Controllers/Users")

router.post("/signup", validatorUser, userCtrl.signup)
router.post("/login", userCtrl.login)

router.post("/activate", authUser, userCtrl.activate)

router.get("/:idUser", authUserSecured, userCtrl.getOne)
router.get("/special/history", authUser, userCtrl.getHistory)
router.get("/special/favorite", authUser, userCtrl.getFavorite)

module.exports = router;
