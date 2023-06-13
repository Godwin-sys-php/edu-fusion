const Users = require("../../Models/Users");

module.exports = async (req, res, next) => {
  try {
    const user = await Users.findOne({ id: req.user.id, });
    await Users.updateOne({ credits: user[0].credits - 1, creditsUsed: user[0].creditsUsed + 1, });

    next();
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
}