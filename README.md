# worko.ai

# Worko.AI Referral Management System

## Introduction

Worko.AI is a fullstack application designed to streamline the management of candidate referrals for organizations. It provides an admin dashboard for managing candidate applications, reviewing statuses, and handling user authentication securely. The system ensures only authorized admins can access sensitive data and perform actions like updating candidate statuses or deleting records.

## Project Type

**Fullstack** (Node.js/Express/MongoDB backend + React frontend)

## Deployed App

- **Frontend:** https://funny-sable-9cd964.netlify.app/
- **Backend:** https://worko-ai-5n7y.onrender.com
- **Database:** MongoDB (local or cloud)

## Directory Structure

```
my-react-app/
├─ Backend/
│  ├─ src/
│  │  ├─ app.js
│  │  ├─ configs/
│  │  ├─ controllers/
│  │  ├─ middlewares/
│  │  ├─ models/
│  │  ├─ routers/
│  │  └─ .env
├─ my-react-app/
│  ├─ src/
│  │  ├─ contexts/
│  │  ├─ pages/
│  │  ├─ utils/
│  │  └─ App.js
```


## Features

- Admin registration and login with JWT authentication
- Secure admin dashboard for managing candidate referrals
- Candidate application form with validation
- Search, filter, and sort candidates
- Update candidate status (pending, reviewed, hired, rejected)
- Delete candidate records
- Persistent authentication using React Context and localStorage

## Design Decisions or Assumptions

- Only admins can access the dashboard and manage candidates.
- JWT tokens are used for secure authentication and authorization.
- Candidate status is limited to predefined values.
- Admin code is required for admin registration and login.
- MongoDB is used for data persistence.

## Installation & Getting Started

### Backend

1. Navigate to the backend directory:
    ```bash
    cd Backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your `.env` file (see example below).
4. Start the backend server:
    ```bash
    node src/app.js
    ```

#### Example `.env` file

```
JWT_SECRET=worko.ai
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/worko_ai
ADMIN_CODE=1234
```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd my-react-app
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend:
    ```bash
    npm start
    ```

## Usage

- Register as an admin using the correct admin code.
- Login as admin to access the dashboard.
- Refer candidates using the application form.
- Manage candidate statuses and records from the dashboard.

## Credentials

_Provide test admin credentials here if needed._

## APIs Used

- No external APIs; all endpoints are custom and documented below.

## API Endpoints

### Admin/User

| Method | Endpoint             | Description                        | Body Params                          |
|--------|----------------------|------------------------------------|--------------------------------------|
| POST   | `/admin/register`    | Register a new admin               | name, email, password, contactInfo, orgName, adminCode |
| POST   | `/admin/login`       | Login as admin                     | email, password, adminCode           |

### Candidates

| Method | Endpoint                | Description                        | Auth Required | Body Params / Query         |
|--------|-------------------------|------------------------------------|--------------|----------------------------|
| POST   | `/apply`                | Submit a new candidate application | No           | name, email, contactInfo, jobRole, resume |
| GET    | `/`                     | Get all candidates (admin only)    | Yes          | search, status, sort, order (query) |
| PUT    | `/:id/status`           | Update candidate status            | Yes          | status                     |
| DELETE | `/delete/:id`           | Delete candidate by ID             | Yes          |                            |



## Technology Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Argon2, dotenv
- **Frontend:** React, React Router, Context API, Fetch API
- **Other:** CORS