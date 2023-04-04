const convertTime = (message) => {
  const timestamp = new Date(message.timestamp * 1000); // converte o timestamp de segundo para milisegundos
  return timestamp.toISOString().slice(0, 19).replace("T", " ");
};

const removeBlankSpace = (message) => {
  const editMessage = message.body
    .toLowerCase()
    .trim()
    .replace(/\s{2,}/g, " ");

  return editMessage;
};

const formatNumber = (message) => {
  const author = message.author ? message.author : message.from;
  const numberReceived = author.substring(2, author.indexOf("@"));

  const regex = /^(\d{2})(\d{1})(\d{4})(\d{4})$/;
  return numberReceived.replace(regex, "($1) $2 $3-$4");
};

const getDataFromMessage = async (message) => {
  const nameReceived = message._data.notifyName;
  const numberReceived = formatNumber(message);
  const hourConverted = convertTime(message);
  const messageReceived = removeBlankSpace(message);

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
