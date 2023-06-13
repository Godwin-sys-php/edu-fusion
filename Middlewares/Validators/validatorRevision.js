module.exports = (req, res, next) => {
  try {
    const { classe, educationSystem, level, attributes, subject } = req.body;
    if (
      (classe.length >= 1 && classe.length <= 100) &&
      (educationSystem.length >= 1 && educationSystem.length <= 100) &&
      (level.length >= 1 && level.length <= 100) &&
      (subject.length >= 1 && subject.length <= 300) &&
      (attributes.length >= 0 && attributes.length <= 300)
    ) {
      return next();
    }

    return res.status(400).json({ invalidForm: true, message: "Les champs fournis ne sont pas valides" })
    
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" })
  }
}