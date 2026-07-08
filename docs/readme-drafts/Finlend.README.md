# FinLend

FinLend is a loan recommendation prototype that combines a Laravel web interface with a FastAPI machine-learning engine. It predicts borrower risk and uses fuzzy logic to recommend loan status, credit limit, and interest rate.

## Overview

The project is split into two main parts:

- `finlend-web`: Laravel application for the user-facing credit form and results page.
- `VSC`: FastAPI AI engine that loads trained model artifacts and exposes a credit calculation endpoint.

The Laravel app collects applicant data, builds the expected feature vector, and sends it to the Python API. The Python API combines a neural-network risk prediction with fuzzy decision rules for final credit recommendations.

## Key Features

- Credit application form built in Laravel.
- FastAPI endpoint for model-backed credit calculation.
- MLP-based default-risk prediction using saved model, scaler, encoders, and feature columns.
- Fuzzy logic engine for loan limit, interest, and approval status.
- Validation for feature count and income limits.
- Result page showing risk and recommended credit decision.
- Separation between web UI and AI inference service.

## Tech Stack

### Web App

- PHP 8.2
- Laravel 12
- Vite
- Tailwind CSS 4

### AI Engine

- Python
- FastAPI
- Uvicorn
- pandas
- numpy
- scikit-learn
- scikit-fuzzy
- joblib

## Project Structure

```text
finlend-web/                  Laravel web application
finlend-web/app/Http/         Controllers and web logic
finlend-web/routes/web.php    Web routes for form and calculation
VSC/main.py                   FastAPI application
VSC/fuzzy_engine.py           Fuzzy credit decision rules
VSC/*.pkl                     Saved model, scaler, encoders, and feature metadata
```

## Getting Started

Run the AI engine first:

```bash
cd VSC
python -m venv .venv
.venv\Scripts\activate
pip install fastapi uvicorn pandas numpy scikit-learn scikit-fuzzy joblib
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Run the Laravel web app in a second terminal:

```bash
cd finlend-web
composer install
npm install
copy .env.example .env
php artisan key:generate
php artisan serve
npm run dev
```

By default, the Laravel controller posts to:

```text
http://127.0.0.1:8000/hitung-kredit
```

## API Summary

```http
POST /hitung-kredit
Content-Type: application/json

{
  "features": [/* ordered numeric/categorical feature vector */]
}
```

The response contains model risk output and fuzzy decision output.

## Limitations

- The model depends on the exact feature order and preprocessing artifacts used during training.
- Income and loan limit values follow the dataset/model scale. Keep currency conversion consistent if the UI displays IDR.
- The recommendation should be treated as decision support, not an automatic loan approval system.
- Real lending use would require explainability, bias testing, compliance review, audit logging, and manual override workflows.

## Suggested Tests

- Contract tests between Laravel feature vector creation and FastAPI expected columns.
- API tests for invalid feature length, invalid income, and missing model artifacts.
- Regression tests for fuzzy rule changes.
- Evaluation against holdout data before presenting the model as reliable.

## Status

Academic/portfolio fintech prototype demonstrating web-to-AI integration for credit risk decision support.
