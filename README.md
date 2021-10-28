# post-office-automation-system-backend

## Setup Guide

- Clone the repository

`git clone https://github.com/shahparth36/post-office-automation-system-backend.git`

- Go into the cloned directory

`cd post-office-automation-system-backend`

- Create .env file and add the following code
> ACCESS_TOKEN_SECRET='{"type":"HS256","key":"somesecret","expiresIn":"time_in_minutes"}'
>
> REFRESH_TOKEN_SECRET='{"type":"HS256","key":"someothersecret","expiresIn":"time_in_minutes"}'
>
> DB_URL = 'your_db_url_string'
>
> PORT = 5000

 Change expiresIn, key and DB_URL as per your need

- Install all the dependencies

`npm install`

- Run the application in development mode

`npm run devStart`

You're done! The server is up and running!
