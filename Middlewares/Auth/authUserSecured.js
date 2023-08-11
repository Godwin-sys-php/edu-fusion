const Users = require("../../Models/Users")
const jwt = require("jsonwebtoken")

require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, process.env.TOKEN, async function(err, decoded) {      
			if (err) {
        return res.status(400).json({ invalidToken: true, message: "Veuillez vous reconnecter", })
			} else {
        const user = await Users.customQuery("SELECT * FROM users WHERE id = ? AND notHere = 0" ,[decoded.id]);
        if (user.length === 0) {
          return res.status(400).json({ invalidToken: true, message: "Veuillez vous reconnecter", })
        }
        req.user = user[0];
        return decoded.id == req.params.idUser ? next() : res.status(400).json({ invalidToken: true, message: "Veuillez vous reconnecter", })
			}
		})
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" })
  }
}