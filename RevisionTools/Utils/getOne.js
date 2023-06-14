const express = require("express");
const ToolUsage = require("../../Models/ToolUsage");
const Users = require("../../Models/Users");

let app = express.Router();

app.get("/artefacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ToolUsage.customQuery(
      "SELECT * FROM revisionToolUsage WHERE `id` = ?",
      [id]
    );
    if (item[0].userId == req.user.id) {
      const user2send = await Users.findOne({ id: req.user.id, });
      return res.status(200).json({ success: true, data: item[0], user: {...user2send[0], password: undefined,} });
    } else {
      return res
        .status(500)
        .json({
          error: true,
          errorMessage: "Une erreur inconnu a eu lieu veuillez réesayer",
        });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        error: true,
        errorMessage: "Une erreur inconnu a eu lieu veuillez réesayer",
      });
  }
});

module.exports = app;
