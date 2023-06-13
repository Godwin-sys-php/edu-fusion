const moment = require("moment");
const ToolUsage = require("../../Models/ToolUsage");

const saveToHistory = async (req, res, next) => {

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

  const inserted = await ToolUsage.insertOne(prep);

  const history = await ToolUsage.customQuery(
    "SELECT * FROM toolUsage WHERE `userId` = ? AND `name` = ? ORDER BY id DESC LIMIT 5",
    [req.user.id, req.locals.name]
  );

  req.usageId = inserted.insertId;
  req.newHistory = history;
	next()
}

module.exports = saveToHistory