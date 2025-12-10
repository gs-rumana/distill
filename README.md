# Distill

**Distill** — an app that helps users pick the top 3 most important tasks and focus using a Pomodoro timer.

---

## About

Distill prioritizes simplicity and privacy. It selects your top 3 tasks with a unique algorithm and provides a Pomodoro timer to help you focus. The app does **not** send analytics, crash reports, or any HTTP requests — no tracking, no ads.

## Features

* Automatic selection of top 3 tasks.
* Full task list with sorting and quick add (FAB).
* Built-in Pomodoro timer with session completion rewards.
* Privacy-first: no analytics, no ads, no external network requests.

## Quick start (developer)

Requirements:

* Node.js (LTS)
* yarn or npm
* Expo CLI (if using Expo managed workflow)
* Android Studio / Xcode (for native builds)

Clone and run:

```bash
git clone https://github.com/gs-rumana/distill.git
cd distill
yarn install
# start the dev server
yarn start
# or if using npm
# npm install && npm run start
```

If this is an Expo Bare project (prebuilt native):

```bash
# prepare native project
expo prebuild
# android
npx react-native run-android
# ios (mac)
npx react-native run-ios
```

## Development notes

* Keep UI minimal and accessible.
* Avoid network calls — the app is designed to be offline-first and local-only.
* When adding new dependencies, prefer small, actively-maintained libraries.

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add ..."`
4. Push and open a PR

Include clear changelog entries and a short description of behavior changes.
