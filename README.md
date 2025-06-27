# AquaEyes Backend

This is the backend for AquaEyes, a flood detection and water level monitoring system. It's a Node.js application built with Express, designed to handle data from a distributed network of IoT devices.

## Key Features

- **Device Management**: APIs for managing IoT devices.
- **Real-time Data Processing**: Uses MQTT for real-time sensor data.
- **Alerting System**: Triggers alerts based on sensor readings.
- **Data Simulation**: Includes a data simulator for testing.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/AquaEyes-Backend.git
    cd AquaEyes-Backend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    Create a `.env` file in the root of the project. You can refer to the `src/config/index.js` file for the required environment variables.

## Available Scripts

-   `npm start`: Starts the application in production mode.
-   `npm run dev`: Starts the application in development mode with `nodemon` for automatic restarts.

## Project Structure

-   `src/`: Main application source code.
    -   `config/`: Configuration files.
    -   `controllers/`: Express controllers.
    -   `models/`: Mongoose models.
    -   `routes/`: Express routes.
    -   `services/`: Business logic (e.g., MQTT).
-   `scripts/`: Utility scripts.
-   `public/`: Static files.
