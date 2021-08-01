const ConversationModel = require("../models/ConversationModel");

class ConversationService {
  async newConversation(props) {
    try {
      await ConversationModel.create(
        { members: [props.senderUsername, props.recieverUsername] },
        function (err, instance) {
          if (err) return handleError(err);
          // saved!
        }
      );
    } catch (err) {}
  }

  async getUserConv(username) {
    try {
      const conversation = await ConversationModel.find({
        members: { $in: [username] },
      });
      return {status:200,conversation:conversation};
    } catch (err) {
        return {status:500,message:"Error"};
    }
  }
}

module.exports = new ConversationService();
