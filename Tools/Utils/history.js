const express = require("express");
const ToolUsage = require("../../Models/ToolUsage");
const Users = require("../../Models/Users");

let app = express.Router();

app.post("/history", async (req, res, next) => {
  try {
    const { name } = req.body;
    const history = await ToolUsage.customQuery(
      "SELECT * FROM toolUsage WHERE `userId` = ? AND `name` = ? ORDER BY id DESC LIMIT 5",
      [req.user.id, name]
    );
    const user2send = await Users.findOne({ id: req.user.id, });
    return res.status(200).json({ success: true, data: history, user: {...user2send[0], password: undefined,} });
  } catch (err) {
    return res
      .status(500)
      .json({
        error: true,
        errorMessage: "Une erreur inconnu a eu lieu veuillez réesayer",
      });
  }
});

module.exports = app;
