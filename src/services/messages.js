const MessageModel = require("../models/MessageModel");

class MessagesService {
  async addMessage(props) {
    try {
      await MessageModel.create(
        { conversationId: props.conversationId, sender:props.sender, message:props.message },
        function (err, instance) {
          if (err) return handleError(err);
          // saved!
        }
      );
    } catch (err) {}
  }

  async getConvMessage(conversationId) {
    try {
      const messages = await MessageModel.find({
        conversationId: { $in: [conversationId] },
      });
      return {status:200,messages:messages};
    } catch (err) {
        return {status:500,message:"Error"};
    }
  }
}

module.exports = new MessagesService();
