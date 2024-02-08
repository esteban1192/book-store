# Bookstore App

This repository contains the code for a simple CRUD (Create, Read, Update, Delete) Bookstore application. The application is divided into two main components: a frontend built with Next.js and a backend built with Express.js.

## Application Overview

The Bookstore application allows users to perform CRUD operations on a collection of books. The frontend communicates with the backend to retrieve data and make changes to the book collection. The backend serves as a mock server, storing data in memory rather than a database.

## Technologies Used

- **Frontend**: The frontend is built using Next.js, a React framework for building server-side rendered applications. Additionally, the following packages are used:
  - Ant Design: A UI component library for React applications, providing pre-designed components for building user interfaces.
  - Formik: A form library for React that helps with form validation, handling, and submission.
  - React Toastify: A notification library for React applications, used for displaying toast notifications.
  - React Modal: A modal component for React applications, used for displaying modals for adding and updating books.
  - Axios: A Promise-based HTTP client for making requests to the backend API.

- **Backend**: The backend is built using Express.js, a minimalist web framework for Node.js. It serves as a mock server, handling CRUD operations for the book collection. Data is stored in memory and not persisted to a database.

## Functionality

The frontend allows users to perform the following actions:

- View a list of books in the bookstore.
- Add a new book to the collection.
- Update an existing book's information.
- Delete a book from the collection.

Each action corresponds to a HTTP request (POST, PUT, GET, DELETE) sent to the backend API, which processes the request and returns the appropriate response.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the `frontend` directory and run `npm install` to install frontend dependencies.
3. Navigate to the `backend` directory and run `npm install` to install backend dependencies.
4. Start the backend server by running `npm start` in the `backend` directory.
5. Start the frontend server by running `npm run dev` in the `frontend` directory.
6. Access the application in your web browser at `http://localhost:3000`.
7. Frontend runs on port 3000 and Backend runs on port 3001. make sure to have them free when you start the servers.

## Contribution

Contributions to the project are welcome! If you have any ideas for improvements or would like to fix a bug, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
