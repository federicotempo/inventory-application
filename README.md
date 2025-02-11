# inventory-application
An inventory management system for a store, developed using Express.js, PostgreSQL, and Prisma ORM, following the MVC architecture with full CRUD capabilities.

# Live preview
https://inventory-application-production-7b1c.up.railway.app/

# Description
This application allows users to manage inventory efficiently by handling categories, items, and suppliers. Users can create, read, update, and delete records for each of these entities. The app features a responsive design, ensuring a seamless experience across different devices.

# Authentication
We have implemented authentication using Passport.js and Express Session. Users must log in to access the inventory management features, ensuring secure and restricted access. Passwords are securely hashed using bcrypt, and session data is stored in PostgreSQL using Prisma Session Store.
