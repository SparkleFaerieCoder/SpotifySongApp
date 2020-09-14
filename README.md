# Spotify Song App

A React Native app to get your list of albums from Spotify and leave notes about them.

The app does the following:

1.  Authenticate with the chosen API. For quick turn around for this proof of concept(POC), the app utilizes [Spotify App Remote](https://cjam.github.io/react-native-spotify-remote/index.html) for authentication. This third party library provided minimal alterations to native files, resulting in quicker turn around to develop POC. Going forward, this library could support session management and playback. Alternatively, the native Spotify SDK could be explored to handle app autonomy and handling complex features requirements.

2.  Once authenticated with your Spotify account, the app will pull a list of your albums and display them in a list view.

3.  Within each album listed, you have the ability to add a note (NOTE: Data is posted to a dummy API endpoint using https://jsonplaceholder.typicode.com/guide.html. In this example, each note is assigned with a id that's associated with each album.

## Installation

You will need Node, Watchman, the React Native command line interface, Xcode and Android Studio.

Refer to the React Native documentation to get started:
[React Native Getting Started](https://reactnative.dev/docs/environment-setup)

## This project was built with the following dependencies:

- **System**:
  OS: macOS 10.15.6
- **Binaries**:
  Node: 12.16.1
  npm: 6.13.4
  Watchman: 4.9.0
- **Managers**:
  CocoaPods: 1.9.3
- **SDKs**:
  iOS SDK:
  Platforms: iOS 13.7
  Android SDK:
  API Levels: 26, 29, 30
  Build Tools: 28.0.3, 29.0.2, 30.0.2
- **IDEs**:
  Android Studio: 4.0
  Xcode: 11.7
- **Languages**:
  Java: 1.8.0_265
  Python: 2.7.16
- **npmPackages**:
  react: 16.13.1 => 16.13.1
  react-native: 0.63.2 => 0.63.2

* **Note**: As explained in the React Native documentation, unexpected issues could arise if you previously installed a global react-native-cli package\_

## Usage

```
npm install
```

### iOS

```
cd ios && pod install
```

```
npx react-native run-ios
```

### Android

```
npx react-native run-android
```

# Challenges & Learnings

There were some roadblocks along the way, leading to it taking much longer than I expected:

Challenges:

1. Personal Macbook and setup of development environment (XCode, Android Studio)
2. General tooling not setup, linters, formatters, plugins. Took time to get everything running to needs.
3. Determining dependencies, library and Spotify for authentication.
4. Documentation took time going to figure out React Native integration with Spotify. Third party library documentation wasn't up to date, leading to unnecessary instruction and additional errors to solve.

Learnings:

1. Spotify integration and current options available for React Native.
2. Mocking data/data relationships
3. New tooling and libraries

# GOING FORWARD:

1. Establish better tooling: `Typescript`, `JSX`
2. Establish Navigation Library: `React Naviation` or `React Native Navigation`
3. Break pieces of code into separate directories: `components`, `services`, `utils`, `models`, `assets`, etc.
4. Better state management: `Redux`, `Context`
5. Better UI tools: `React Native Elements`
6. Establish better data schemas
7. Testing: `Jest`, `Unit`, `e2e`
