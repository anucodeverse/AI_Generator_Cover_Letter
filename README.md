# AI Cover Letter Generator

An AI-powered web application that helps users generate professional, personalized cover letters by entering their details, key skills, and a job description. The project demonstrates AI integration, API key security, prompt engineering, and modern full-stack development practices.

---

## Project Theme

**AI Integration, API Keys, and Prompt Engineering**

This project focuses on building an AI wrapper application where users provide career-related information, and the app generates a clean, professional cover letter using AI.

---

## Project Goal

The goal of this project is to create a tool where a user can enter:

- Candidate Name
- Job Role
- Company Name
- Key Skills
- Job Description
- Optional Resume Upload

The application then generates a customized cover letter that can be copied and used for job applications.

---

## Why This Project?

AI wrapper applications are currently one of the fastest-growing trends in SaaS products. This project helps in understanding important real-world development concepts such as:

- Working with AI APIs
- Managing API keys securely
- Writing effective prompts
- Handling loading states
- Creating a professional user interface
- Generating useful AI-based content
- Building beginner-friendly SaaS-style applications

---

## Features

### Beginner Features

- Professional form UI
- Inputs for candidate details
- Captures user data on submit
- Generates a cover letter using a mock AI template
- Displays generated output in a clean result box
- Copy to Clipboard functionality

### Intermediate Features

- Real AI integration using Gemini API or OpenAI API
- Dynamic prompt generation based on user input
- Secure API key handling using `.env`
- Loading state while the AI generates the response
- Error handling for failed API requests

### Advanced Features

- Resume PDF upload support
- Resume text extraction
- Personalized cover letter using resume content and job description
- Properly formatted AI response with paragraphs
- SaaS-style clean and responsive UI

---

## Tech Stack

### Frontend

- React.js
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js

### AI Integration

- Google Gemini API  
  or
- OpenAI API

### Other Tools

- dotenv
- pdf-parse
- Clipboard API

---

## Folder Structure

```bash
AI-Cover-Letter-Generator/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
