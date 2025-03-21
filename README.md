# Phone Verification System

## Overview
This project is a simple phone verification system using **Node.js**, **Express**, and **Vanilla JavaScript**. It allows users to enter a phone number, receive an OTP (One-Time Password), and verify it using an API.

## Features
- Send OTP to a phone number.
- Verify the OTP.
- Simple UI for user interaction.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript (Fetch API)
- **Middleware:** CORS, Body-Parser

## Installation

### Prerequisites
- Node.js (v18.20.6)
- npm (10.8.2)

### Steps to Run
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-repo/phone-verification.git
   cd phone-verification
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Start the Server:**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000`

4. **Open the Frontend:**
   - Open `index.html` in a browser.

## API Endpoints
### 1. Send OTP
**Endpoint:** `POST /api/send-code`

**Request Body:**
```json
{
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "message": "Verification code sent!",
  "data" :{}
}
```

### 2. Verify OTP
**Endpoint:** `POST /api/verify-code`

**Request Body:**
```json
{
  "phoneNumber": "1234567890",
  "code": "123456"
}
```

**Response:**
```json
{
  "message": "Phone number verified successfully!",
  "token":"ezfdf jdsfsdfjnfff"
}
```

## Project Structure
📂 phone-verification/
├── 📂 config/
│   ├── jwtConfig.js (Handles JWT token creation and verification)
├── 📂 routes/
│   ├── masterRoute.js (Defines API routes)
├── 📂 controllers/
│   ├── shcTechSmsController.js (Handles SMS operations)
├── 📂 models/
│   ├── User.js (User schema for MongoDB)
├── 📂 public/
│   ├── dashboard.html (Frontend UI)
├── .env (Environment configuration)
├── server.js (Main server file)
├── package.json (Project dependencies)
├── README.md (Project documentation)

## License
This project is licensed under the MIT License.

## Author
- Jitendra Pardhi- [GitHub Profile](https://github.com/your-profile)

# phone-verification
