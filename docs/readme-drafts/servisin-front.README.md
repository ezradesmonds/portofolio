# Servisin Frontend

Servisin Frontend is an Expo and React Native app for an on-demand home service marketplace. It includes customer flows, technician flows, booking, payments, chat, profiles, referrals, and subscription screens.

## Overview

The app is structured as a mobile-first service marketplace. Customers can discover services, create bookings, complete payment flows, chat, manage addresses, and track service history. Technicians have separate onboarding, order, calendar, wallet, profile, and job-detail workflows.

## Key Features

- Customer login and registration.
- Home, discover, all-services, and service-detail screens.
- Booking confirmation and payment/finish-payment flows.
- Booking history and transaction detail screens.
- Chat list and chat room screens.
- Customer profile, profile editing, addresses, notifications, reviews, help, and terms pages.
- Referral and subscription screens.
- Technician login, registration, onboarding, and service-area setup.
- Technician dashboard, orders, calendar, wallet, bank account, profile, job detail, chat, and notification flows.
- Environment-based API base URL configuration.

## Tech Stack

- Expo 54
- React Native 0.81
- React 19
- Expo Router 6
- TypeScript
- Zustand
- Axios
- Expo modules for image, haptics, status bar, web browser, secure storage, and more

## Project Structure

```text
app/                    Expo Router screens and route groups
src/                    Shared source code
src/constants/Config.ts API base URL configuration
assets/                 Images, icons, and fonts
components/             Shared UI components
```

## Getting Started

```bash
npm install
npx expo start
```

Run on a target platform:

```bash
npm run android
npm run ios
npm run web
```

Configure the backend API URL:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

If this value is not provided, the app falls back to the configured production API URL in `src/constants/Config.ts`.

## Backend Dependency

The app expects the Servisin Laravel backend API to provide authentication, services, bookings, payments, chat, technician, and admin-related endpoints.

## Security Notes

- Store real tokens with secure storage and never hard-code production credentials.
- Validate all booking, payment, and technician state transitions on the backend.
- Treat client-side role checks as UI convenience only. Authorization must be enforced server-side.

## Suggested Tests

- E2E smoke tests for customer booking and technician order acceptance.
- API contract tests between mobile app expectations and backend responses.
- Offline/error-state tests for booking, payment, and chat screens.

## Status

Mobile frontend for a service marketplace prototype.
