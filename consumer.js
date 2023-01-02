const amqp = require("amqplib");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:4040");
    const ch1 = await connection.createChannel();
    const result = await ch1.assertQueue("jobs");

    ch1.consume("jobs", (msg) => {
      console.log(msg.content.toString());
      ch1.ack(msg);
    });
  } catch (error) {
    console.log(error);
  }
}

connect();
