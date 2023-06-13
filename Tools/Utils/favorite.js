const express = require("express");
const ToolUsage = require("../../Models/ToolUsage");
const Users = require("../../Models/Users");

let app = express.Router();

app.put("/favorite/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tool = await ToolUsage.findOne({ id: id, });
    await ToolUsage.updateOne({ favorite: !tool[0].favorite, }, { id: id });
    const user2send = await Users.findOne({ id: req.user.id, });
    const newTool = await ToolUsage.findOne({ id: id, });
    return res.status(200).json({ success: true, favorite: newTool[0].favorite, user: {...user2send[0], password: undefined,} });
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
