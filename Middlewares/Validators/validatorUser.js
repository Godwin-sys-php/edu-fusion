const Users = require("../../Models/Users");

module.exports = async (req, res, next) => {
  
  try {
    console.log(req.body);
    const {fname, lname, phoneNumber, email, password,why,} = req.body;
    if (
      (fname.length >= 1 && fname.length <= 100) &&
      (lname.length >= 1 && lname.length <= 100) &&
      (phoneNumber) &&
      (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(req.body.email)) &&
      (password.length >= 8) &&
      (why.length >= 1 && why.length <= 150)
    ) {
      const checkUser = await Users.customQuery("SELECT * FROM users WHERE phoneNumber = ? OR email = ?", [phoneNumber, email])

      if (checkUser.length > 0) {
        return res.status(400).json({ existUser: true, message: "Un utilisateur utilisant le même numéro de téléphone et/ou la même adresse email est déjà existant" });
      }

      next()
    } else {
      return res.status(400).json({ invalidForm: true, message: "Les champs fournis ne sont pas valides" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" })
  }
}