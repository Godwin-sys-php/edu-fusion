const Revision = require("../../Models/Revision");

module.exports = async (req, res, next) => {
  try {
    const revision = await Revision.customQuery("SELECT * FROM revision WHERE id = ? AND forgotten = 0", [req.params.idRevision]);

    if (revision.length == 0) return res.status(404).json({ revisionNotFound: true, });

    req.revision = revision[0];
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
}