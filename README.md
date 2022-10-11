# Description

Vaccine management system backend application. It provides API functions to manage users and vaccine and its allergies information.

## How to run?

- Clone this repository.
- Install all the dependencies using `yarn` or `npm install`.
- Setup database and provide database credentials in .env. Database config is in knexfile.ts
- Run `npm run migrate` to run migrations.
- Provide JWT_SECRET and JWT_TOKEN_SECRET in .env using `require('crypto').randomBytes(256).toString('base64')`
- Provide cloudinary credentials in .env. Cloudinary config is in cloudinary.ts. Then create upload preset of name 'vaccine' at cloudinary. 
- Start the server using `npm run dev`.
