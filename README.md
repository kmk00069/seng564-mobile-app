## Welcome to Sheetz!

This repository is an Expo app (managed with `expo` and `expo-router`) built with React Native and TypeScript.

This README gives platform-specific steps for running the app locally (Windows PowerShell), quick troubleshooting tips, and a short overview of the project layout.

## Requirements

- Node.js (LTS recommended — Node 18+). Install via the official installer or use `nvm-windows` if you need multiple versions.
- npm (comes with Node) or use `npx` for the Expo CLI.
- For Android emulation: Android Studio + an AVD and `adb` on PATH.
- Expo Go (optional) on your phone for quick device testing.

> Note: iOS Simulator requires macOS and Xcode — you cannot run it from Windows.

## Quickstart (Windows PowerShell)

Open PowerShell in the repository root (`c:\Users\Kyle\OneDrive - USNH\Desktop\seng564-mobile-app-react_upload`) and run:

```powershell
# install dependencies
npm install

# start the Expo dev server (Metro)

# or explicitly
npx expo start
```

Controls in the terminal / Expo DevTools:
- Press `w` to run in the web browser.
- Press `a` to open in an Android emulator (start an AVD first).
- Scan the QR code with Expo Go on your phone to open the app on a device.

You can also run specific scripts defined in `package.json`:

```powershell
npm run android   # open Android emulator/device
npm run web       # run in a browser
npm run ios       # opens iOS simulator (macOS only)
npm run lint      # run linter
npm run reset-project  # move starter code to app-example and create blank app
```

## If `node` or `npm` aren't recognized

If PowerShell reports `node : The term 'node' is not recognized` or `npm : The term 'npm' is not recognized`:

1. Install Node.js LTS from https://nodejs.org and make sure the installer option "Add to PATH" is selected.
2. Or install `nvm-windows` (https://github.com/coreybutler/nvm-windows) and then `nvm install <version>` / `nvm use <version>`.
3. After installing, close and re-open PowerShell, then run:

```powershell
node -v
npm -v
```

If the commands still fail, make sure the Node installation directory (e.g., `C:\Program Files\nodejs`) is on your `PATH`.

## Common troubleshooting

- Clear Metro cache if bundler behaves oddly:

```powershell
npx expo start -c
```

- Android emulator not detected:
   - Start an AVD from Android Studio first.
   - Verify `adb` sees devices: `adb devices`.

- OneDrive issues: this project is located inside OneDrive — file watchers sometimes misbehave when files sync. If you see strange watcher errors, consider moving the project outside OneDrive or pausing syncing.

- Native module/build errors (e.g., Reanimated, dev clients): those typically require proper Android SDK / NDK setup or using Expo development builds. If you encounter those, paste the exact error and we'll troubleshoot.

## Project structure (high level)

- `app/` — main app routes (uses file-based routing via `expo-router`).
   - `index.tsx`, `_layout.tsx`, `modal.tsx`, and a `(tabs)/` folder for tab screens.
- `components/` — reusable UI components (e.g., `AbilityScore.tsx`, `CharacterInfo.tsx`, `Inventory.tsx`, etc.).
- `assets/` — images and static assets.
- `scripts/reset-project.js` — helper to reset starter content.
- `app.json` / `package.json` — Expo and project configuration.

## Development notes

- The app uses Expo SDK and `expo-router` for file-based routing and layout. Edit files under `app/` to add screens and routes.
- This project is TypeScript-ready. Run `tsc --noEmit` if you want a full type check.

## Contributing

- Fork and open a branch for features/bugfixes.
- Add tests or a small reproduction for tricky bugs.
- Keep changes small and document breaking changes.

## Useful links

- Expo docs: https://docs.expo.dev
- expo-router docs: https://expo.github.io/router/docs

----

If you want, I can add a short `RUNNING.md` with troubleshooting steps you actually hit (for example the `npm`/`node` PATH issue), or wire up a small `CONTRIBUTING.md`. Which would you prefer next?
