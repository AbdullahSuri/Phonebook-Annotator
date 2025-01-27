# Phonebook and Text Editor Application

## Overview

The Phonebook and Text Editor Application is a Node.js-based web application that allows users to manage a phonebook and edit text documents with features such as contact decoration. It provides two main functionalities:

1. **Phonebook Management**: Add, search, and manage contacts.
2. **Text Editor**: Input text and automatically highlight references to phonebook contacts.

## Directory Structure

```
.
├── code-samples
│   └── phonebook.json       # JSON file containing contact data
├── node_modules             # Dependencies
├── public                   # Public assets (CSS, images, etc.)
│   ├── css
│   │   └── main.css         # Stylesheet for the app
│   ├── img
│   │   └── logo.png         # Application logo
├── tests                    # Test files
│   └── app-test.mjs         # Tests for application functionality
├── views                    # Handlebars view templates
│   ├── editor.hbs           # Template for the editor page
│   ├── layout.hbs           # Main layout template
│   └── phonebook.hbs        # Template for the phonebook page
├── app.mjs                  # Main application logic
├── contact.mjs              # Contact class definition
├── eslint.config.js         # ESLint configuration
├── package.json             # Node.js package configuration
├── package-lock.json        # Dependency lockfile
├── README.md                # Documentation file
```

## Features

### Phonebook Management

- **View Contacts**: Display a list of all contacts.
- **Search Contacts**: Filter contacts by name, email, or phone number.
- **Add Contacts**: Add a new contact to the phonebook.

### Text Editor

- **Input Text**: Type or paste text into the editor.
- **Highlight Contacts**: Automatically detect and decorate contact names with additional details such as email and phone numbers.

## Dependencies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/): Web framework for Node.js.
- [Handlebars](https://handlebarsjs.com/): Template engine for rendering views.
- [Supertest](https://www.npmjs.com/package/supertest): Testing HTTP assertions.
- [Chai](https://www.chaijs.com/): Assertion library for tests.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.mjs
   ```
   The server will run on `http://localhost:3000/`.

## Usage

### Phonebook Page

1. Navigate to `http://localhost:3000/phonebook`.
2. View all existing contacts or use the search bar to find specific ones.
3. Add new contacts using the form provided. Fields include:
   - Name
   - Email
   - Phone Numbers (comma-separated for multiple numbers)

### Text Editor Page

1. Navigate to `http://localhost:3000/editor`.
2. Enter text into the editor.
3. Submit the text to see contact names replaced with clickable decorations displaying their details.

## Configuration

The application reads contact data from the `phonebook.json` file located in the `code-samples` directory. This file contains an array of contact objects, each with the following structure:

```json
{
  "phoneNumbers": ["123-456-7890", "800-123-4567"],
  "email": "johndoe@example.com",
  "name": "John Doe"
}
```

You can modify this file to add or update initial contact data.

## Testing

Tests are written using the Mocha testing framework with Chai and Supertest. Run the tests using the following command, in the root directory:

```bash
npx mocha tests/app-test.mjs
```

### Test Cases

1. **Redirection**: Ensures the root URL redirects to the editor page.
2. **Static File Serving**: Verifies that static assets like images are served correctly.
3. **Editor Page**: Ensures the editor page renders correctly and modifies text as expected.
4. **Phonebook Page**: Ensures all contacts are displayed and filtered accurately based on search criteria.
5. **Adding Contacts**: Ensures new contacts are successfully added and displayed.

## Implementation Details

### `Contact` Class

The `Contact` class models individual contacts with the following attributes:

- `name`: Contact name.
- `email`: Contact email address.
- `phoneNumbers`: Array of phone numbers.

### Phonebook Functionalities

- **Search**: Filters contacts based on case-insensitive partial matches for names, emails, or phone numbers.
- **Add Contact**: Accepts form input, validates it, and appends the new contact to the phonebook.

### Editor Functionalities

- **Text Decoration**: Matches contact names in the input text using regular expressions and replaces them with clickable spans containing contact details.

### Middleware

- **Static Files**: Serves files from the `public` directory.
- **Body Parsing**: Parses `application/x-www-form-urlencoded` form data.
- **Custom Logger**: Logs HTTP methods, paths, and query parameters for debugging.

### Views

- **Editor Page**: Displays an input text area and a modified text output area.
- **Phonebook Page**: Displays a table of contacts and a form to add new ones.
