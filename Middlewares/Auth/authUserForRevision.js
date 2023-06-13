const Users = require("../../Models/Users")
const Revision = require("../../Models/Revision")
const jwt = require("jsonwebtoken")

require("dotenv").config()

module.exports = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, process.env.TOKEN, async function(err, decoded) {      
			if (err) {
        console.log(err);
        return res.status(400).json({ invalidToken: true, message: "Veuillez vous reconnecter", })
			} else {
        const user = await Users.findOne({ id: decoded.id });
        if (user.length === 0) {
          return res.status(400).json({ invalidToken: true, message: "Veuillez vous reconnecter", })
        }
        req.user = user[0];
        const revision = await Revision.findOne({ id: req.params.idRevision })
        if (revision.length == 0) return res.status(400).json({ invalidToken: true, message: "Veuillez vous reconnecter", });

        return revision[0].userId == decoded.id ? next() : res.status(400).json({ invalidToken: true, message: "Veuillez vous reconnecter", })
			}
		})
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" })
  }
}