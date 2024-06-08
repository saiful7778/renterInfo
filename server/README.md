# Renter Info - web app

- **Client**: [client-side-code](https://github.com/saiful7778/renterInfo/tree/main/client)
- **Server**: [server-side-code](https://github.com/saiful7778/renterInfo/tree/main/server)

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Setup and Installation](#setup-and-installation)

## Technologies Used

### Frontend

- **TypeScript**
- **React 18**
- **Tanstack router** for routing.
- **TailwindCSS**: For styling.
- **Shadcn**: For building buttons, dropdowns, toast messages, and forms.
- **Radix UI**: For unstyled UI components.
- **react-hook-form**: For handling form state and validation.
- **Zod**: For schema validation.

### Backend

- **Express.js**
- **Mongoose** ODM

## Setup and Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/saiful7778/renterInfo.git
   cd uifry
   ```

2. **Install dependencies:**

   ```bash
   cd client
   ```

   ```js
   npm install
   // or
   yarn install
   // or
   pnpm install
   // or
   bun install
   ```

   > Install client dependencies

   ```bash
   cd server
   ```

   ```js
   npm install
   // or
   yarn install
   // or
   pnpm install
   // or
   bun install
   ```

   > Install server dependencies

   > **Note:** Here I use `bun` you can any of them

3. **Run the development server:**

   ```javascript
     npm run dev
     // or
     yarn dev
     // or
     pnpm dev
     // or
     bun run dev
   ```

4. **Build for production:**
   ```javascript
     npm run build
     // or
     yarn build
     // or
     pnpm build
     // or
     bun run build
   ```
