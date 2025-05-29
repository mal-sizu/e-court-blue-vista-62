# e-court-blue-vista-62

A modern web application for law firm and court management, featuring secure authentication and dashboard statistics.

## Features
- Email/password login with OTP verification
- JWT-based authentication
- User dashboard with real-time and statistical data
- Role-based access

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or bun

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd e-court-blue-vista-62
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   bun install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   bun run dev
   ```

### Environment Variables
- Configure your backend API endpoints and secrets as needed (see `vite.config.ts` or your environment setup).

## Authentication Flow
1. **Login:**
   - User enters email and password.
   - Credentials are sent to `/auth/login`.
   - On success, the app prompts for OTP.
2. **OTP Verification:**
   - User enters the OTP sent to their email.
   - OTP is verified via `/auth/login-verifyotp`.
   - On success, a JWT token is received.
3. **Dashboard Stats Fetch:**
   - The app uses the JWT token to call `/api/dashboard/stats`.
   - User data and access rights are loaded into the app context.

## Project Structure
- `src/components/auth/` — Authentication UI and logic
- `src/context/AuthContext.tsx` — Global authentication state
- `src/services/authService.js` — API calls for authentication and dashboard
- `src/pages/` — App pages

## Customization
- Update the `User` interface in `AuthContext.tsx` to match your backend's user data.
- Adjust API endpoints in `authService.js` as needed.

## Troubleshooting
- If you see `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`, check your API endpoint and backend status.
- Ensure your frontend is correctly proxying API requests to the backend.

## License
MIT
