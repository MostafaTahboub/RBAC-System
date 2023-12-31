﻿# Role-Based Access Control (RBAC) System

This project is a Role-Based Access Control (RBAC) system implemented using TypeORM and Express.js. It allows you to manage users, roles, permissions, and assign roles to users. Additionally, it provides API endpoints to create permissions, roles, and retrieve user information along with their roles and permissions.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup with AWS RDS](#database-setup-with-aws-rds)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js and npm: [Download and Install Node.js](https://nodejs.org/)
- Git: [Download and Install Git](https://git-scm.com/)
- AWS Account: You will need an AWS account to set up an RDS database.

### Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/MostafaTahboub/RBAC-System.git
```
  
2. Navigate to the project directory:

```
cd rbac-system
```   
3. Install project dependencies:

```
npm install

```

### Configuration
Before running the application, you need to configure your environment variables. Create a '.env ' file in the project root and add the following variables:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME= "dataBase name"
DB_USER_NAME="your user name "
DB_PASSWORD="your password"
```

### Database Setup with AWS RDS

1. To set up your database using AWS RDS:

2. Log in to your AWS Console.

3. Navigate to the RDS service.

4. Create a new RDS instance with your preferred database engine (e.g., PostgreSQL, MySQL).

5. Configure your RDS instance with the necessary settings, such as database name, username, and password.

6. Once your RDS instance is up and running, copy the DATABASE_URL connection string and paste it into your '.env'file.

### Usage
To start the application, run the following command:

```
npm run dev 
```
The application will start, and you can access it in your web browser at `http://localhost:3000` (or the port you specified in your .env file).

### Endpoints

The following API endpoints are available:

- `POST /api/users`: Create a new user.
- `POST /api/permissions`: Create a new permission.
- `POST /api/roles`: Create a new role along with its permissions.
- `POST /api/assign-role/:userId/:roleId`: Assign a role to a user.
- `GET /api/users/:userId`: Get a user's information along with their roles and permissions.

 For detailed information on how to use these endpoints, refer to the API documentation in the code or consult the documentation provided with the project.

### Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the project.
