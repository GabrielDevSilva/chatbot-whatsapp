const { Client, LocalAuth } = require("whatsapp-web.js");
const { getDataFromMessage } = require("./helpers.js");
const qrcode = require("qrcode-terminal");
const knexConfig = require("./knexfile.js");
const knex = require("knex")(knexConfig.development);

const TRIGGER_MESSAGE = "bom dia bot";
const AUTOMATIC_MESSAGE = "Olá {}!! \nIsso é uma mensagem automática...";

const response = (name) => AUTOMATIC_MESSAGE.replace("{}", name);
const client = new Client({ authStrategy: new LocalAuth() });

const logStatus = async () => {
  console.clear();

  const info = client.info;
  const battery = await info.getBatteryStatus();
  const percentage = `${battery.battery}%`;

  console.log(`Client is ready!`);
  if (info.phone && info.platform)
    console.log(`running on phone ${info.phone}`);
  if (info.pushname && info.platform)
    console.log(`${info.pushname}'s ${info.platform} device!`);
  if (battery.battery)
    console.log(
      `The battery has ${percentage} and is ${
        battery.plugged ? "" : "not"
      } charging`
    );
};

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("ready", logStatus);
client.on(
  "change_battery",
  async (batteryInfo) => batteryInfo.battery % 5 === 0 && (await logStatus())
);

client.on("message", async (message) => {
  const { chat, nameReceived, numberReceived, hourConverted, messageReceived } =
    await getDataFromMessage(message);
  if (messageReceived !== TRIGGER_MESSAGE) return;
  try {
    await Promise.all([
      chat.sendMessage(response(nameReceived)),
      knex("MessageEvent").insert({
        senderName: nameReceived,
        senderNumber: numberReceived,
        createdAt: hourConverted,
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
});

client.initialize();
