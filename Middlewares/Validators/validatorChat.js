module.exports = (req, res, next) => {
  try {
    const { chat } = req.body;
    console.log(req.body);
    if (
      (chat.length >= 1 && chat.length <= 300) &&
      (req.revision.tokenNbre < 3500)
    ) {
      return next();
    }

    return res.status(400).json({ invalidForm: true, message: "Votre message est trop long ou trop court" })
    
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" })
  }
}