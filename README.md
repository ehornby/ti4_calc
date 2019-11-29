# Twilight Imperium Stats Tracker
Tracks games of Twilight Imperium, displays results and winners of previously played games.

## Getting Started

### Prerequisites

```
Node.js - https://nodejs.org/en/
Google Firebase account
```

### Installing

1. Install Node.js
2. Clone this repo to a local directory
3. Navigate to `/src` folder using command prompt, PowerShell, etc.
4. Run command `npm install`.
5. Create a new Firebase project by following the instructions at `https://firebase.google.com/docs/web/setup`
6. Set up a new Cloud Firestore with the following collections:
  - users
  - games
7. In `/src` folder, update `firebase.js.example` with your project's configuration details, and rename to `firebase.js`.

Once `npm install` has completed, run command `npm start` to start the development server and open the project on port 3000.

## Live version

https://ti4-tracker.firebaseapp.com

## Authors

- Eric Hornby
