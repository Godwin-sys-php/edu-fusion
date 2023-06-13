const Users = require("../../Models/Users");

const sendResponse = async (req, res, next) => {
	let response = { success: true, }
	if(req.locals.output){
		response.output = req.locals.output
	}
  if(req.usageId) {
    response.id = req.usageId;
  }
  if(req.newHistory) {
    response.history = req.newHistory;
  }
  const user2send = await Users.findOne({ id: req.user.id, });
  response.user = {...user2send[0], password: undefined,};

	return res.status(200).json(response)
	
}

module.exports = sendResponse