# Junk Twitter

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Dependencies](#dependencies)
6. [Support](#support)
7. [Contributing](#contributing)
8. [License](#license)
9. [Project Link](#project-link)

## Introduction

This is Junk Twitter. Like Twitter but Junk. Create your Profile today and start tweeting.

## Features
- User authentication with bcrypt for secure password hashing.
- Session management using express-session and cookie-parser for handling user sessions.
- Integration with MySQL database using Sequelize ORM for data storage and manipulation.
- Implementation of CRUD operations (Create, Read, Update, Delete) for managing user data.
- Templating engine integration with express-handlebars for rendering dynamic views.
- Environment variable configuration with dotenv for managing sensitive data.
- Optional database seeding functionality for populating initial data.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine. You can download and install Node.js from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd user-list
   ```
3. Install dependencies using npm:
    ```bash
   npm install
   ```
4. Create a .env file in the root directory of the project.
5. Add the following environment variables to the .env file:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```
   Replace `your_mongodb_connection_string` with the connection string for your MongoDB instance.

6. To start the application, run the following command:
    ```bash
   npm start
   ```

7. If you need to populate initial data into your database, you can run the following command:
    ```bash
   npm run seed
   ```

## Usage

### Sign Up

1. Navigate to the sign-up page by clicking on the "Sign Up" link.
2. Fill out the required fields, including username, email, and password.
3. Click the "Sign Up" button to create your account.

### Log In

1. Navigate to the log-in page by clicking on the "Log In" link.
2. Enter your registered email and password.
3. Click the "Log In" button to access your account.

### View Profile

1. Once logged in, you will be redirected to your profile page.
2. Here, you can view your profile information, including your username and email.

### Create a Tweet

1. On the dashboard or home page, you'll find a text input area labeled "Compose Tweet."
2. Type your message in the text input area.
3. Click the "Tweet" button to post your message.

### View Tweets

1. On the dashboard or home page, you'll see a feed of tweets from users you follow.
2. Scroll through the feed to view tweets from other users.

### Log Out

1. To log out of your account, click on the "Log Out" link.
2. You will be redirected to the log-in page.


## Dependencies
- [bcrypt](https://www.npmjs.com/package/bcrypt) v5.0.0
- [dotenv](https://www.npmjs.com/package/dotenv) v8.2.0
- [express](https://www.npmjs.com/package/express) v4.17.1
- [express-handlebars](https://www.npmjs.com/package/express-handlebars) v5.2.0
- [mongoose](https://www.npmjs.com/package/mongoose) v7
- [express-session](https://www.npmjs.com/package/express-session) v1.17.2
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) v1.4.5

## Support

For any support-related queries, please email us at [support@example.com](mailto:support@example.com).

## Contributing

We welcome contributions to Junk Twitter! Please consult our contributing guidelines for more details on how to participate.

## License

This project is licensed under the GNU General Public License. See the [LICENSE](LICENSE.md) file for more details.

## Project Link

For the live version of the project, please visit: [Junk Twitter]().