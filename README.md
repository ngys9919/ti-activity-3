# LuxuryStay - Hotel Booking Web App

LuxuryStay is a premium, full-stack hotel booking application built with Vanilla JavaScript and Supabase. It offers a seamless experience for browsing luxury rooms and managing reservations with a sleek, modern UI.

## ✨ Features

- **Luxury UI/UX:** A stunning navy and gold design with glassmorphism, responsive grids, and smooth animations.
- **Dynamic Room Listing:** Browse available rooms fetched in real-time from Supabase.
- **Booking Management:** 
  - Effortless booking via a modal form.
  - Form validation (e.g., check-out must be after check-in).
  - Secure data storage in Supabase PostgreSQL.
- **My Bookings Page:** View your reservation history with calculated stay duration and total price.
- **Performance Optimized:** Built with pure Vanilla JS for maximum speed and minimal overhead.

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+)
- **Backend/Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Environment Management:** `dotenv` for Node.js scripts.

## 📁 Project Structure

```text
ti-activity-3/
├── index.html        # Main landing page & room listing
├── bookings.html     # My Bookings dashboard
├── style.css         # Premium custom styling
├── script.js         # Core application logic & Supabase integration
├── config.js         # Centralized frontend configuration
├── setup_db.js       # Database initialization script (Node.js)
├── init.sql          # SQL script for manual database setup
├── .env              # Sensitive credentials (ignored by git)
└── .gitignore        # Git exclusion rules
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed (for database setup).
- A Supabase account and project.

### 2. Database Initialization
1. Open your **Supabase SQL Editor**.
2. Run the code found in `init.sql`. This will create the `rooms` and `bookings` tables and seed them with sample data.

### 3. Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ngys9919/ti-activity-3.git
   cd ti-activity-3
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment:
   - Create a `.env` file in the root directory.
   - Add your Supabase credentials:
     ```env
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_anon_key
     SUPABASE_CONN_STRING=your_postgres_connection_string
     ```
4. Verify the database connection:
   ```bash
   node setup_db.js
   ```

### 4. Running the App
Since this is a vanilla JS app, you can simply open `index.html` in your favorite browser to get started!

## 📄 License
This project is for educational purposes as part of a technical activity.
