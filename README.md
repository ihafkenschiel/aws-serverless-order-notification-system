# Order Notification System

This project is a simple microservices-based order notification system built on AWS. It demonstrates the use of AWS Lambda, API Gateway, SQS, and DynamoDB to create a scalable, event-driven architecture for processing orders and sending notifications.

## Overview

The system has two main microservices:

1. **Order Service**: Handles incoming order requests from clients. When an order is created, the service stores it (optionally) in DynamoDB and sends an event to an SQS queue.

2. **Notification Service**: Listens for new order events on the SQS queue and sends notifications (simulated by logging the message to the console).

## Architecture

The architecture includes the following AWS components:
- **AWS Lambda**: Serverless functions that handle order creation and notifications.
- **API Gateway**: Manages HTTP requests and routes them to the Order Service.
- **SQS (Simple Queue Service)**: A message queue that decouples the Order and Notification services.
- **DynamoDB**: (Optional) Stores order information in a NoSQL database.

## Project Structure

```
order-notification-system/
├── services/
│   ├── order-service/
│   │   ├── src/
│   │   │   └── createOrder.js          # Lambda function for order creation
│   │   ├── serverless.yml              # Serverless config for Order Service
│   │   └── package.json                # Dependencies for Order Service
│   └── notification-service/
│       ├── src/
│       │   └── sendNotification.js     # Lambda function for sending notifications
│       ├── serverless.yml              # Serverless config for Notification Service
│       └── package.json                # Dependencies for Notification Service
└── README.md                           # Project documentation and setup instructions
```

## Getting Started

### Prerequisites

- **Node.js** and **npm**: Ensure you have Node.js and npm installed on your machine.
- **Serverless Framework**: Install globally by running:
  ```bash
  npm install -g serverless
  ```
- **AWS CLI**: Configure AWS CLI with credentials that have permission to use Lambda, API Gateway, SQS, and DynamoDB.

### Setup and Deployment

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/order-notification-system.git
   cd order-notification-system
   ```

2. **Navigate to each service folder**, install dependencies, and deploy using Serverless Framework:
   ```bash
   cd services/order-service
   npm install
   serverless deploy
   ```

   Repeat the above commands for the `notification-service`.

3. **Test the Order Service**:
   - Use a tool like Postman to send a POST request to the `/order` endpoint created by API Gateway. 
   - This should create an order, save it to DynamoDB (optional), and push a message to SQS.
   
4. **Check Notification Logs**:
   - The Notification Service listens to the SQS queue and logs messages for each new order.
   - You can check the logs to see confirmation messages.

## Example Request

Make a POST request to the API Gateway endpoint for creating an order:

```json
POST /order
{
  "orderId": "123",
  "product": "Widget A",
  "quantity": 2
}
```

The response will confirm that the order was created, and a notification message will be logged by the Notification Service.

## Customization

You can extend this example by adding more services, such as a **Payment Service** or **Inventory Management Service**, or by integrating with actual email/SMS services for real notifications.

## License

This project is open-source and available under the MIT License.

---

### Contributions

Contributions are welcome! Feel free to fork this repository and submit pull requests.