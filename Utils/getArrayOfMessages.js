const RevisionChat = require("../Models/RevisionChat")

module.exports = async (revisionId) => {
  const chats = await RevisionChat.customQuery("SELECT * FROM revisionChat WHERE revisionId = ?", [revisionId]);

  let chat2return = [];

  for (let index in chats) {
    chat2return.push({
      role: chats[index].role,
      content: chats[index].content,
    });
  }

  return chat2return;
}