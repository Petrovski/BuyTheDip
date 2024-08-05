# BuyTheDip Application

## Overview
BuyTheDip is a web application built using React for the front end, Node.js for the back end, and PostgreSQL for the database. It allows users to track stock prices and view the biggest price dips in the market today!

## Getting Started
To run this application locally, follow these steps:

1. **Prerequisites**
   - Node.js (version >= 16)
   - PostgreSQL
   - Git

2. **Installation**
   - Clone the repository:
     ```bash
     git clone https://github.com/Petrovski/BuyTheDip.git
     cd BuyTheDip
     ```
   - Install dependencies:
     ```bash
     cd client && npm install
     cd ../server && npm install
     ```

3. **Database Setup**
   - Create a .env file in the `server` root directory and copy the values below, using your own credentials as necessary:
     ```bash
      DB_USER=postgres
      DB_HOST=localhost
      DB_NAME=stocks
      DB_PASSWORD="<your_password_here>" (must be a string)
      DB_PORT=5432 (default PostgreSQL port)
     ```
   - (Optional) Seed the database with sample data. This requires you have ran the back-end application to create the necessary DB and tables, otherwise start the back-end and it should create the tables for you.
     ```bash
     npm run seed-db
     ```

4. **Start the Application**
   - Start the server:
     ```bash
     cd server && npm start
     ```
   - Start the client:
     ```bash
     cd client && npm start
     ```
   - Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage
- Register an account or log in if you already have one.
- Add stocks to your watchlist and track their prices.

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a new Pull Request.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact
For any inquiries or support, please contact [alexpetroski@gmail.com](mailto:alexpetroski@gmail.com).
