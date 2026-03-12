# 🌿 Plant Care App

A web-based application to help you manage your plants' watering schedules, track their care history, and stay organized with reminders and statistics.

## Overview

The Plant Care App is a React-based web application that allows users to:
- **Manage multiple plants** with custom watering schedules
- **Track watering history** with statistics
- **Get notifications** for plants that need watering
- **View a calendar** of upcoming watering dates
- **Multi-user support** with individual user accounts

## Features

### 1. **Login & Authentication**
Simple user authentication system:
- Create new user accounts with passwords
- Secure login to access personal plant collection
- Multi-user support - each user has their own plants

**[Screenshot location: Add image of the login screen here - show the username and password input fields, login button, and create account option]**

### 2. **Main Screen - Plant Management**
The primary dashboard where you manage all your plants:
- **Plant Cards**: Visual overview of each plant with name, type, and next watering date
- **Search & Filter**: Find plants quickly by name or type
- **Water Button**: Mark a plant as watered - automatically sets the next watering date
- **Edit/Details**: Modify plant information (name, type, frequency, notes)
- **Delete**: Remove plants from your collection
- **Today's Plants**: Section showing all plants that need watering today

**[Screenshot location: Add image of the main plant list screen - show multiple plant cards with their information, the search/filter bar at the top, the "Today's Plants" section below, and action buttons (Add Plant, Statistics, Calendar)]**

**[Screenshot location: Add close-up image of a plant card - showing plant name, type, next watering date, and action buttons (Water, Edit, Delete)]**

### 3. **Add/Edit Plant Form**
Create and modify plant information:
- **Plant Name**: Custom name for your plant
- **Plant Type**: Category (e.g., "Succulent", "Fern", "Cactus")
- **Watering Frequency**: How many days between waterings (1-30 days)
- **Location**: Where the plant is placed
- **Notes**: Additional care tips or observations
- **Next Watering Date**: When to water next (auto-calculated)

**[Screenshot location: Add image of the plant form page - show all input fields, the form title "Add New Plant," and buttons for Save and Cancel]**

### 4. **Statistics Screen**
Visual analytics of your plant care:
- **Total Plants**: Count of all plants you're managing
- **Total Waterings**: Cumulative number of times you've watered plants
- **Average Water Count**: Statistics on watering frequency
- **Charts**: Visual representations of plant data (e.g., plants per type, watering patterns)

**[Screenshot location: Add image of the statistics screen - show the stat cards (Total Plants, Total Waterings, Average Water Count) and any charts/graphs below them]**

### 5. **Watering Calendar**
Monthly calendar view of your plant care schedule:
- View all upcoming watering dates
- Color-coded or marked dates showing plants that need water
- See the full month at a glance
- Plan ahead for your plant care routine

**[Screenshot location: Add image of the calendar view - show a monthly calendar with dates marked for watering, and a list of plants that need water on selected dates]**

### 6. **Browser Notifications**
Stay on top of your plant care:
- App requests permission to send browser notifications
- Receive alerts when plants need watering today
- Notifications show plant names that need water
- Works even if the app isn't actively open

**[Screenshot location: Add image of a browser notification popup - showing plant names that need watering today]**

### 7. **Navigation Bar**
Easy access to all app sections:
- Display current logged-in user
- Quick access to Statistics and Calendar
- Logout button to switch users

**[Screenshot location: Add image of the top navigation bar - showing user name, current view, and navigation buttons]**

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **UI Library**: Material-UI (MUI) v7
- **Charts**: Recharts
- **Icons**: MUI Icons Material
- **Storage**: Browser localStorage
- **Styling**: CSS and Emotion (MUI's CSS-in-JS)

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Flower-watering-webapp/plantcare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
plantcare/
├── src/
│   ├── components/
│   │   ├── auth/              # Login component
│   │   ├── plants/
│   │   │   ├── MainScreen/    # Plant list and management
│   │   │   ├── form/          # Plant add/edit form
│   │   │   └── stats/         # Statistics display
│   │   ├── calendar/          # Watering calendar view
│   │   └── layout/            # Navigation and toolbar
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Notification utilities
│   ├── App.tsx                # Root component with view management
│   └── main.tsx               # Application entry point
├── index.html
└── package.json
```

## How to Use

### Getting Started
1. **Create an account** - Enter any username and password on the login screen
2. **Login** - Use your credentials to access the app
3. **Add your first plant** - Click "Új növény" (New Plant) button

### Managing Plants
- **Add a plant**: Click the "Új növény" button, fill in the form, and save
- **Water a plant**: Click the "Water" button on a plant card - it automatically sets the next watering date
- **Edit plant details**: Click the plant card or pencil icon to modify information
- **Delete a plant**: Click the trash icon and confirm deletion
- **Search plants**: Use the search box to find plants by name or type
- **Filter by type**: Use the filter dropdown to show only specific plant types

### Viewing Information
- **Main Screen**: See all your plants and today's watering tasks
- **Statistics**: View overview of your plant collection and watering history
- **Calendar**: See the entire month's watering schedule at once

### Browser Notifications
- When you first login, the app requests permission to send notifications
- Accept the permission to receive alerts about plants that need watering
- Notifications show up even if you close the app

## Data Storage

- All plant data is stored in the browser's **localStorage**
- Data persists when you close and reopen the browser
- Each user's plants are stored separately
- **No data is sent to a server** - everything stays local on your device

## Browser Support

- Chrome/Chromium
- Firefox
- Safari
- Edge
- Any modern browser supporting:
  - React 19
  - ES2020+
  - localStorage
  - Web Notifications API

## Development

### Linting
```bash
npm run lint
```

Run ESLint to check code quality.

### Available Scripts
- `npm run dev` - Start development server with HMR
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source. Please check the LICENSE file for details.

## Notes

- The app is designed for desktop and tablet use
- Plant watering schedules are calculated from the watering frequency (in days)
- To clear all data, clear your browser's localStorage for this site
- Each plant owner sees only their own plants

---

**Language Note**: The app interface is primarily in Hungarian (a learning project on a Hungarian-language platform). The logic and features are fully functional regardless of language.
