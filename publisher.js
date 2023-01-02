const amqp = require("amqplib");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:4040");
    const ch1 = await connection.createChannel();
    const result = await ch1.assertQueue("jobs");
    setInterval(() => {
      ch1.sendToQueue(
        "jobs",
        Buffer.from(JSON.stringify({ numbr: Math.floor(Math.random() * 1000) }))
      );
      console.log("message sent to Queue");
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}

connect();
