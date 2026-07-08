# PPDB Sekolah

PPDB Sekolah is a PHP and MySQL web application for student admissions. It supports public school information pages, student registration, document upload, student dashboards, and admin validation workflows.

## Overview

The app models a simple school admission system. Public visitors can read information about registration, scholarships, announcements, FAQ, and school profile. Students can create accounts, submit admission forms, upload documents, and track status. Admin users can review submissions and manage admission information.

## Key Features

- Public landing and information pages.
- Student account registration and login.
- Role-aware access for admin and student users.
- Student admission form covering personal, parent, school, and major/program data.
- Document upload support for required registration files.
- Student dashboard and registration status tracking.
- Printable registration proof.
- Admin dashboard for applicant validation and status updates.
- Admission information management.
- CSV export support.
- SQL setup/dump files for local database initialization.

## Tech Stack

- PHP
- MySQL/MariaDB
- HTML, CSS, Bootstrap-style UI
- Procedural PHP structure
- SQL import/setup scripts

## Project Structure

```text
index.php              Public landing page
login.php              Login page
register.php           Account registration
koneksi.php            Database connection
setup.php              Setup helper
setup_db.php           Database setup helper
admin/                 Admin dashboard and validation pages
siswa/                 Student dashboard and registration pages
assets/                CSS, uploads, and static assets
init.sql               Initial schema/data script
ppdb_sekolah.sql       Database dump
```

## Getting Started

1. Create a MySQL database, for example `ppdb_sekolah`.
2. Import `init.sql` or `ppdb_sekolah.sql`.
3. Configure database credentials in `koneksi.php`.
4. Serve the project with XAMPP, Laragon, or another PHP local server.

Example with PHP built-in server:

```bash
php -S localhost:8000
```

Then open:

```text
http://localhost:8000
```

## Security Notes

- Remove real personal data and uploaded documents before publishing the repository.
- Keep production database credentials out of source control.
- Validate uploaded file type, size, and storage path before production use.
- Add CSRF protection and stronger authorization checks if the system is deployed beyond a local/demo environment.

## Suggested Tests

- Registration validation tests.
- Upload validation tests.
- Admin authorization tests.
- Status transition tests for admission review.

## Status

School admission management prototype using a simple PHP/MySQL stack.
