# Goaling Ball: Your goal management service.
[![Build Status](https://travis-ci.org/swsnu/swpp2020-team13.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team13)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team13/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team13?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team13&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team13)

🚨 Travis CI not recognizing postgreSQL properly, resulting in build failure

## Deployment
Deployed on: https://www.goalingball.com/ 

*The server currently disabled*

## Demo Video
[Video Link](https://youtu.be/4pj6hIpGhKg)

## How to start

### Frontend

```
cd frontend
yarn install // to install packages
yarn start // start frontend
```

### Backend

1. Add `.env` file to `/backend/config`
2. Start virtual environment

    ```
    virtualenv --python=python3.7 venv
    source venv/bin/activate
    ```

3. Install requirements

    ```
    pip install -r requirements.txt
    ```

4. Start server

    ```
    python manage.py runserver
    ```

