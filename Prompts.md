# Prompts Documentation

##This file contains the prompts used during the planning, development, debugging, and improvement of the **AI Cover Letter Generator** project.

1)I want to build an AI Cover Letter Generator web application.

The user should enter candidate name, job role, company name, skills, and job description. Based on these inputs, the app should generate a professional cover letter.

Explain the project goal, required features, technology stack, and development flow in a beginner-friendly way.

2)Design a professional user interface for an AI Cover Letter Generator.

The UI should include:
- Candidate Name input
- Job Role input
- Company Name input
- Key Skills textarea
- Job Description textarea
- Generate Cover Letter button
- Output section
- Copy to Clipboard button

Suggest a clean SaaS-style layout with good spacing, modern colors, and responsive design.

3)Create a React component for an AI Cover Letter Generator form.

The form should collect:
- Candidate Name
- Job Role
- Company Name
- Key Skills
- Job Description

On submit, the form should send the data to the backend API and display the generated cover letter.
Also include loading state and error handling.

4)Create a mock AI function for a cover letter generator.

The function should accept candidate name, job role, company name, and skills as input.

It should return a professional cover letter using a hardcoded template string.

5)Create an Express.js backend API for an AI Cover Letter Generator.

The API should have a POST route called /generate-cover-letter.

It should receive candidate name, job role, company name, key skills, and job description from the frontend.

The backend should generate a prompt and send it to an AI API such as Gemini or OpenAI.

6)Explain how to connect Google Gemini API with a Node.js and Express.js backend.

The API key should be stored in a .env file.

Create a backend route that sends a dynamic prompt to Gemini and returns the generated cover letter to the frontend.

7)How can I securely store API keys in a full-stack JavaScript project?

Explain how to use a .env file in the backend and how to prevent API keys from being pushed to GitHub.

Also explain what should be added to the .gitignore file.

8)How can I add a loading state in React while waiting for an AI API response?

The button should show "Generating..." while the request is processing.

The form should prevent multiple submissions during loading.

9)Add error handling to a React and Express.js AI cover letter generator.

Handle these cases:
- Empty input fields
- API request failure
- Invalid API key
- Server not running
- AI response not received

Show user-friendly error messages on the frontend.

10)Create a Copy to Clipboard feature in React.

The user should be able to copy the generated cover letter by clicking a button.

After copying, show a message like "Copied successfully".

11)Add a resume upload feature to an AI Cover Letter Generator.

The user should upload a PDF resume.

The backend should extract text from the PDF and use that resume text along with the job description to generate a personalized cover letter.

12)How can I extract text from a PDF resume in a Node.js backend?

Use a library like pdf-parse.

Explain how to upload the file, read the PDF content, extract text, and send it to an AI prompt.

13)Review the design of my AI Cover Letter Generator.

Suggest improvements to make it look like a modern SaaS product.

Focus on:
- Color palette
- Card layout
- Button design
- Form spacing
- Mobile responsiveness
- Output box design
- Professional typography

14)Make my AI Cover Letter Generator responsive for desktop, tablet, and mobile screens.

Suggest CSS improvements for:
- Form layout
- Button width
- Textarea size
- Output section
- Page spacing
