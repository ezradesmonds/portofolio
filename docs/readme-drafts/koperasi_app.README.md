# Koperasi Tailor Management App

Koperasi Tailor Management App is a Streamlit and SQLite management dashboard for tailoring cooperative operations. It tracks projects, purchases, inventory, tailors, suppliers, assignments, and smart production allocation.

## Overview

The app is designed for a small garment/tailoring cooperative that needs a practical internal tool instead of spreadsheets. It centralizes operational data and includes a smart allocation page for matching new production orders to available tailor capacity.

## Key Features

- Executive dashboard for financial, project, stock, and operational KPIs.
- Project management with project status, quantity, deadline, and assignment information.
- Purchase tracking for material or operational spending.
- Inventory tracking for stock movements and current material availability.
- Tailor directory with skill, workload, and operational data.
- Supplier directory and contact information.
- Assignment monitoring for order distribution.
- Smart allocation page for recommending solo or split-order tailor assignments.
- WhatsApp handoff links for contacting recommended tailors.
- SQLite local database initialization and seed scripts.

## Tech Stack

- Language: Python
- App framework: Streamlit
- Data handling: pandas
- Database: SQLite
- Allocation logic: Python business rules with optional scikit-learn usage

## Project Structure

```text
Dashboard.py                  Main Streamlit dashboard
db.py                         Shared database helper
db_init.py                    SQLite schema initialization
seed_tailors.py               Sample tailor data seeding
seed_projects.py              Sample project data seeding
allocation.py                 Allocation helper logic
pages/2_Projects.py           Project management page
pages/3_Purchases.py          Purchase tracking page
pages/4_Inventory.py          Inventory page
pages/5_Tailors.py            Tailor management page
pages/6_Suppliers.py          Supplier page
pages/7_Assignments.py        Assignment monitoring page
pages/8_Smart_Allocation.py   Smart allocation workflow
```

## Getting Started

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

If the smart allocation module imports machine-learning helpers in your environment, also install scikit-learn:

```bash
pip install scikit-learn
```

Initialize and seed the local database:

```bash
python db_init.py
python seed_tailors.py
python seed_projects.py
```

Run the app:

```bash
streamlit run Dashboard.py
```

## Database Tables

The initialization script creates tables for admins, tailors, suppliers, projects, purchases, inventory, and assignments.

## Limitations

- SQLite is suitable for a local prototype, but a hosted multi-user deployment should use a server database.
- WhatsApp links depend on accurate phone numbers. Sample or generated numbers should be replaced before real usage.
- Allocation recommendations should remain human-approved until validated against real production outcomes.

## Suggested Improvements

- Add authentication and role permissions before deploying outside a trusted local environment.
- Add audit logs for assignment and inventory changes.
- Expand automated tests around allocation edge cases and database migrations.
- Move seed/sample data out of production deployment paths.

## Status

Operational prototype for a tailoring cooperative management workflow.
