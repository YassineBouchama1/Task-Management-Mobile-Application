# Task Management App

A modern task management app built with React Native, Expo, and TypeScript. This app enables users to  manage, and track tasks, add comments, and upload photos for progress tracking.

## Features

### Task Management:
- update, and delete tasks.
- Mark tasks as completed or in progress.
- Add comments to tasks .

### Photo Upload:
- Take photos using the device camera.
- Upload photos from the gallery.

### User-Friendly UI:
- Clean and intuitive design.
- Responsive layout for mobile devices.

### State Management:
- Uses Zustand for global state management.

### Permissions:
- Handles camera and media library permissions gracefully.

## Technologies Used
- **Frontend**: React Native, Expo
- **State Management**: Zustand
- **Routing**: Expo Router
- **Type Checking**: TypeScript
- **Storage**: AsyncStorage
- **Media**: Expo Camera, Expo MediaLibrary
- **Icons**: Expo Vector Icons


### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (install globally using `npm install -g expo-cli` or `yarn global add expo-cli`)
- Expo Go app (for testing on a physical device)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YassineBouchama1/Task-Management-Mobile-Application
   cd Task-Management-Mobile-Application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npx expo start
   ```

5. Open the app:
   - Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal.
   - Alternatively, run the app on an emulator:


## Project Structure

```plaintext
task-management-app/
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable UI components
├── hooks/                # Custom hooks usePhotoSave)
├── store/                # Zustand store for state management
├── types/                # TypeScript type definitions
├── utils/                # Utility functions (e.g., storage helpers)
├── app/                  # Expo Router pages
│   ├── (tabs)/           # Tab-based navigation
│   ├── camera/           # Camera page for taking photos
├── index.tsx               # Main app entry point
├── README.md             # Project documentation
└── package.json          # Project dependencies and scripts
```


## Contact

For questions or feedback, reach out to:

- **Yassine Bouchama**
- **Email**: bouchamajob@gmail.com
- **GitHub**: [YassineBouchama1](https://github.com/YassineBouchama1)

