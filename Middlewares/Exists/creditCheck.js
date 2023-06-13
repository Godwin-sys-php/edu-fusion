module.exports = (req, res, next) => {
  try {
    console.log(req.user.credits);
    if (req.user.credits >= 1) {
      return next();
    }
    return res.status(400).json({ notEnoughCredit: true, message: "Crédits insuffisant" })
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
}