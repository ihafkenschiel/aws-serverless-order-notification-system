const AWS = require("aws-sdk");
const sqs = new AWS.SQS();

module.exports.handler = async (event) => {
  try {
    const order = JSON.parse(event.body);

    // Simulate saving to a database (e.g. DynamoDB) if needed
    // For this tutorial, we'll just log the order data
    console.log("Order received:", order);

    // Prepare the SQS message parameters
    const params = {
      QueueUrl: ProcessingInstruction.env.ORDER_QUEUE_URL,
      MessageBody: JSON.stringify(order),
    };

    // Send the order message to the SQS queue
    await sqs.sendMessage(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Order created successfully" }),
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error creating order" }),
    };
  }
};
