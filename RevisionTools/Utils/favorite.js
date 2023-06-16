const express = require("express");
const RevisionToolUsage = require("../../Models/RevisionToolUsage");
const Users = require("../../Models/Users");

let app = express.Router();

app.put("/:id/favorite", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tool = await RevisionToolUsage.findOne({ id: id, });
    if (req.user.id == tool[0].userId) {
      await RevisionToolUsage.updateOne({ favorite: !tool[0].favorite, }, { id: id });
      const user2send = await Users.findOne({ id: req.user.id, });
      const newTool = await RevisionToolUsage.findOne({ id: id, });
      return res.status(200).json({ success: true, favorite: newTool[0].favorite, user: {...user2send[0], password: undefined,} });
    } else {
      return res
        .status(500)
        .json({
          error: true,
          errorMessage: "Une erreur inconnu a eu lieu veuillez réesayer",
        })
    }
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
