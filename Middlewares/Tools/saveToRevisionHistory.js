const moment = require("moment");
const RevisionToolUsage = require("../../Models/RevisionToolUsage");

const saveToRevisionHistory = async (req, res, next) => {

	if (!req.locals.output) {
		res.json({
      error: true,
			message: "No Content was generated, please try again"
		})
		return
	}
  
	let prep = {
    name: req.locals.name,
    favorite: false,
    forgotten: false,
    inputLength: req.locals.input.length,
    outputLength: req.locals.output.length,
    credits: 1,
    price: req.locals.tokens * 0.000002,
    input: req.locals.inputRaw,
    output: req.locals.output,
    created: moment().unix(),
    userId: req.user.id,
  }

  const inserted = RevisionToolUsage.insertOne(prep);

  req.usageId = inserted.insertId;
	next()
}

module.exports = saveToRevisionHistory