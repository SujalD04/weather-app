View the deployed website here: https://weather-app-alpha-three-60.vercel.app/

```markdown
# Weather App - MERN Stack

This is a weather app built using the MERN stack (MongoDB, Express, React, Node.js) along with the OpenWeatherMap API for fetching weather data. It supports user authentication, historical search data storage, and a theme toggle functionality.

## Features

- **Weather Data**: Fetches weather data for any city using the OpenWeatherMap API.
- **History**: Stores searched cities and their weather data in MongoDB Atlas.
- **Theme Toggle**: Switch between light and dark themes.
- **Weather Information**: Displays details like temperature, humidity, wind speed, sunrise/sunset, weather conditions, and more.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Atlas)
- **API**: OpenWeatherMap API
- **Hosting/Deployment**: Render (for backend) and Vercel (for frontend)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for cloud database
- [OpenWeatherMap API key](https://openweathermap.org/api) for fetching weather data
- [Vite](https://vitejs.dev/) for development

## Project Setup

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Install Dependencies

#### Backend Dependencies (Node.js + Express)

Navigate to the backend folder and install the required dependencies:

```bash
cd backend
npm install
```

#### Frontend Dependencies (React + Tailwind CSS)

Navigate to the frontend folder and install the required dependencies:

```bash
cd frontend
npm install
```

### 3. Configure the Environment Variables

#### Backend

Create a `.env` file in the backend directory.

Add the following variables to the `.env` file:

```plaintext
MONGO_URI=<your-mongodb-atlas-uri>
OPENWEATHERMAP_API_KEY=<your-openweathermap-api-key>
PORT=5000
```

Replace `<your-mongodb-atlas-uri>` with your MongoDB Atlas connection string, and `<your-openweathermap-api-key>` with your OpenWeatherMap API key.

#### Frontend

Create a `.env` file in the frontend directory.

Add the following variable to the `.env` file:

```plaintext
VITE_API_URL=http://localhost:5173
```

### 4. Run the Application Locally

#### Start the Backend Server

Navigate to the backend directory and run the server:

```bash
cd backend
npm start
```

The backend will be available at `http://localhost:5000`.

#### Start the Frontend Development Server

Navigate to the frontend directory and run the development server:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### 5. Deploy the Application

- **Frontend**: Deploy the frontend to [Vercel](https://vercel.com/).
- **Backend**: Deploy the backend to [Render](https://render.com/).

Follow the deployment guides on Vercel and Render to connect your GitHub repository and deploy your application.

## Usage

- Open the app in your browser.
- Enter the name of any city in the search bar to fetch the weather data.
- Toggle the theme between light and dark modes.
- View historical search data saved in MongoDB Atlas.
