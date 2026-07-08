# Tower Defense Java

Tower Defense Java is a LibGDX-based tower defense game built with Java and Gradle. It targets desktop and Android builds and demonstrates game-loop programming, object-oriented design, enemy waves, towers, projectiles, collisions, and player resource management.

## Overview

The project was built as a Java game project with separate desktop and Android targets. Players defend a path by placing or upgrading towers, surviving enemy waves, and managing limited resources.

## Key Features

- Tower defense gameplay loop with enemy waves.
- Towers, projectiles, and collision handling.
- Player health, money, score, and wave progression.
- Tower upgrade and resource management mechanics.
- Pause, reset, and game-speed style controls.
- Desktop launcher for local play.
- Android module for mobile build targets.
- Automated test dependencies for unit testing game logic.

## Tech Stack

- Java
- Gradle
- LibGDX 1.9
- LWJGL desktop backend
- Android Gradle Plugin
- JUnit and Mockito for tests

## Project Structure

```text
desktop/                Desktop launcher and desktop-specific build setup
android/                Android launcher and mobile build setup
build.gradle            Root Gradle configuration
settings.gradle         Gradle modules
gradlew / gradlew.bat   Gradle wrapper
```

## Getting Started

Run the desktop game on Windows:

```bash
gradlew.bat desktop:run
```

Run tests:

```bash
gradlew.bat desktop:test
```

Build the Android APK:

```bash
gradlew.bat android:assembleDebug
```

The Android build requires a working Android SDK installation.

## Development Notes

- Keep game state logic separate from rendering code where possible so it can be tested.
- Add deterministic tests for wave spawning, damage calculation, resource spending, and tower upgrades.
- Avoid hard-coding level balance directly into rendering classes.

## Status

Java/LibGDX tower defense game project with desktop and Android build targets.
