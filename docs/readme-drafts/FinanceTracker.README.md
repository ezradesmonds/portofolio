# FinanceTracker

FinanceTracker is a Laravel personal finance application for tracking income, expenses, bank/e-wallet accounts, budgets, subscriptions, reminders, reports, and admin-managed recommendations.

## Overview

The project helps users monitor personal finance activity from one dashboard. It supports transaction tracking, monthly budget monitoring, subscription reminders, account balances, categories, charts, and admin-facing management pages.

## Key Features

- Landing page and authentication flow.
- User dashboard with monthly budget, expense, income, and subscription summaries.
- Bank account and e-wallet account tracking.
- Income and expense entry management.
- Category and budget management.
- Subscription tracking with due dates and calendar-style views.
- Push notification subscription support.
- Command for sending due subscription reminders.
- Reports and chart-oriented dashboard views.
- Admin area for recommendation and user management.

## Tech Stack

- PHP 8.3
- Laravel 13
- MySQL/MariaDB
- Vite
- Tailwind CSS 4
- Laravel WebPush notification channel
- PHPUnit

## Project Structure

```text
app/Http/Controllers/       Dashboard, tracking, subscription, budget, category, admin, auth, and push controllers
app/Models/                 BankAccount, Budget, Category, Expense, Income, Subscription, Transaction
database/migrations/        Finance schema and push subscription tables
resources/views/            Landing, dashboard, tracking, subscription, calendar, budget, category, and admin views
routes/web.php              Web routes
routes/console.php          Scheduled/console commands
```

## Getting Started

```bash
composer install
npm install
copy .env.example .env
php artisan key:generate
```

Configure the database:

```env
DB_DATABASE=finance_db
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations and seeders:

```bash
php artisan migrate --seed
```

Start local development:

```bash
composer run dev
```

Or run the backend and frontend watcher separately:

```bash
php artisan serve
npm run dev
```

Run tests:

```bash
php artisan test
```

## Reminder Command

The codebase includes a subscription reminder command:

```bash
php artisan subscriptions:send-due-reminders
```

For production, schedule this command through Laravel's scheduler.

## Security Notes

- Keep `.env` credentials out of source control.
- Finance data should be scoped per authenticated user.
- Admin pages should remain protected by explicit authorization.
- Push notification keys and subscriptions should be treated as sensitive operational data.

## Suggested Tests

- Budget calculation tests.
- Subscription due-date and reminder tests.
- Authorization tests for user-owned finance records.
- Admin access tests.
- Import/export tests if financial data portability is added later.

## Status

Personal finance tracking prototype built with Laravel.
