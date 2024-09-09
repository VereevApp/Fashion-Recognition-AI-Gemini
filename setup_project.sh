#!/bin/bash

# Create main project directories
mkdir -p frontend/public frontend/src/components frontend/src/styles
mkdir -p backend/tests

# Create README files
echo "# Fashion Recognition AI using Gemini API

This project uses React for the frontend and Flask for the backend to create a fashion recognition application powered by Google's Vision AI.

## Setup
Follow the instructions in the frontend and backend README files to set up and run the application." > README.md

echo "# Frontend for Fashion Recognition AI

## Setup
1. Ensure you have Node.js and npm installed
2. Run \`npm install\` to install dependencies
3. Run \`npm start\` to start the development server

## Structure
- \`src/components\`: React components
- \`src/styles\`: CSS files
- \`public\`: Static files" > frontend/README.md

echo "# Backend for Fashion Recognition AI

## Setup
1. Ensure you have Python 3.7+ installed
2. Create a virtual environment: \`python -m venv venv\`
3. Activate the virtual environment:
   - On Unix or MacOS: \`source venv/bin/activate\`
   - On Windows: \`venv\\Scripts\\activate\`
4. Install dependencies: \`pip install -r requirements.txt\`
5. Set up Google Cloud credentials (see separate instructions)
6. Run the server: \`python app.py\`

## Structure
- \`app.py\`: Main Flask application
- \`tests/\`: Unit tests" > backend/README.md

# Create frontend files
touch frontend/public/index.html
touch frontend/src/App.js
touch frontend/src/index.js
touch frontend/src/components/ImageUpload.js
touch frontend/src/components/ResultDisplay.js
touch frontend/src/styles/App.css
touch frontend/package.json

# Create backend files
touch backend/app.py
touch backend/requirements.txt
touch backend/tests/test_app.py

echo "Fashion Recognition AI project structure created successfully!"