const convertTime = (message) => {
  const timestamp = new Date(message.timestamp * 1000); // converte o timestamp de segundo para milisegundos
  return timestamp.toISOString().slice(0, 19).replace("T", " ");
};

const getDataFromMessage = async (message) => {
  const nameReceived = message._data.notifyName;
  const author = message.author ? message.author : message.from;
  const numberReceived = author.substring(2, author.indexOf("@"));
  const hourConverted = convertTime(message);
  const messageReceived = message.body.toLowerCase();

  const chat = await message.getChat();
  const isGroupMessage = chat.isGroup;

  return {
    nameReceived,
    numberReceived,
    hourConverted,
    messageReceived,
    isGroupMessage,
    chat,
  };
};

module.exports = {
  convertTime,
  getDataFromMessage,
};
