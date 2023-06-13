const Users = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
const Revision = require("../Models/Revision");
const ToolUsage = require("../Models/ToolUsage");
const RevisionToolUsage = require("../Models/RevisionToolUsage");

require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { fname, lname, phoneNumber, email, password, why } = req.body;
    const newUser = {
      fname: fname,
      lname: lname,
      phoneNumber: phoneNumber,
      email: email,
      password: await bcrypt.hash(password, 10),
      created: moment().unix(),
      credits: 0,
      creditsUsed: 0,
      plan: "",
      status: "not activated",
      current_period_end: null,
      cancel_at_period_end: true,
      why: why,
    };

    const inserted = await Users.insertOne(newUser);

    return res.status(201).json({
      created: true,
      user: { ...newUser, password: undefined | null },
      token: jwt.sign(
        { ...newUser, password: undefined | null, id: inserted.insertId },
        process.env.TOKEN,
        {
          expiresIn: 86400 * 7, // 7 weeks
        }
      ),
    });
  } catch (error) {
    console.log("ici");
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.customQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (user.length == 0)
      return res.status(400).json({
        email: false,
        password: false,
        message: "Numéro de téléphone inexistant",
      });

    if (!bcrypt.compareSync(password, user[0].password))
      return res.status(400).json({
        email: true,
        password: false,
        message: "Mot de passe incorrect",
      });

    return res.status(200).json({
      logged: true,
      user: { ...user[0], password: undefined | null },
      token: jwt.sign(
        { ...user[0], password: undefined | null },
        process.env.TOKEN,
        {
          expiresIn: 86400 * 7, // 7 weeks
        }
      ),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.activate = async (req, res) => {
  try {
    const toSet = {
      plan: "trial",
      status: "activate",
      credits: 15,
    };

    await Users.updateOne(toSet, { id: req.user.id });
    console.log(req.user);
    const user = Users.findOne({ id: req.user.id });
    
    return res.status(200).json({ success: true, user: { ...user[0], password: undefined | null } });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
    
  }
}

exports.getOne = async (req, res) => {
  try {
    const user = await Users.findOne({ id: req.params.idUser });
    const last3 = await Revision.customQuery("SELECT * FROM revision WHERE userId = ? ORDER BY created DESC LIMIT 3", [req.params.idUser]);
    return res
      .status(200)
      .json({ success: true, user: { ...user[0], passord: undefined | null }, last3: last3 });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    let tool = await ToolUsage.findOne({ userId: req.user.id, });
    tool.forEach(function(obj) {
      obj.type = "tool";
    });
    let sessions = await Revision.findOne({ userId: req.user.id, });
    sessions.forEach(function(obj) {
      obj.type = "session";
    });
    const revisionTool = await RevisionToolUsage.findOne({ userId: req.user.id, });
    revisionTool.forEach(function(obj) {
      obj.type = "revisionTool";
    });
    let finalArray = tool.concat(sessions).concat(revisionTool);
    finalArray.sort(function(a, b) {
      return a.created - b.created;
    });
    const user2send = await Users.findOne({ id: req.user.id, });
    return res.status(200).json({ success: true, data: finalArray.reverse(), user: {...user2send[0], password: undefined,} });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
}

exports.getFavorite = async (req, res) => {
  try {
    let tool = await ToolUsage.customQuery("SELECT * FROM toolUsage WHERE userId = ? AND favorite = 1", req.user.id);
    tool.forEach(function(obj) {
      obj.type = "tool";
    });
    let sessions = await Revision.customQuery("SELECT * FROM revision WHERE userId = ? AND favorite = 1", req.user.id);
    sessions.forEach(function(obj) {
      obj.type = "session";
    });
    const revisionTool = await RevisionToolUsage.customQuery("SELECT * FROM revisionToolUsage WHERE userId = ? AND favorite = 1", req.user.id);
    revisionTool.forEach(function(obj) {
      obj.type = "revisionTool";
    });
    let finalArray = tool.concat(sessions).concat(revisionTool);
    finalArray.sort(function(a, b) {
      return a.created - b.created;
    });
    const user2send = await Users.findOne({ id: req.user.id, });
    return res.status(200).json({ success: true, data: finalArray.reverse(), user: {...user2send[0], password: undefined,} });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
}
