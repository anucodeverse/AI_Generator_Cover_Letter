import React, { useState } from "react";

const API_URL = "http://localhost:5000/api/generate-cover-letter";

function App() {
  const [formData, setFormData] = useState({
    candidateName: "",
    jobRole: "",
    companyName: "",
    keySkills: "",
    jobDescription: "",
    useMock: false
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyText, setCopyText] = useState("Copy to Clipboard");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((oldData) => ({
      ...oldData,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF resume only.");
      setResumeFile(null);
      return;
    }

    setError("");
    setResumeFile(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setLetter("");
    setCopyText("Copy to Clipboard");

    const body = new FormData();
    body.append("candidateName", formData.candidateName);
    body.append("jobRole", formData.jobRole);
    body.append("companyName", formData.companyName);
    body.append("keySkills", formData.keySkills);
    body.append("jobDescription", formData.jobDescription);
    body.append("useMock", String(formData.useMock));

    if (resumeFile) {
      body.append("resume", resumeFile);
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate cover letter.");
      }

      setLetter(result.letter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    if (!letter) return;

    await navigator.clipboard.writeText(letter);
    setCopyText("Copied!");

    setTimeout(() => {
      setCopyText("Copy to Clipboard");
    }, 1500);
  }

  return (
    <main className="page">
      <section className="hero">
        <h1>AI Cover Letter Generator</h1>
        <p className="subtitle">
          Enter your details, add a job description, upload your resume, and generate a clean professional cover letter.
        </p>
      </section>

      <section className="app-card">
        <form className="form" onSubmit={handleSubmit}>
          <div className="grid">
            <label>
              Candidate Name
              <input
                type="text"
                name="candidateName"
                placeholder="Example: Priya Sharma"
                value={formData.candidateName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Job Role
              <input
                type="text"
                name="jobRole"
                placeholder="Example: Frontend Developer"
                value={formData.jobRole}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Company Name
            <input
              type="text"
              name="companyName"
              placeholder="Example: Google"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Key Skills
            <textarea
              name="keySkills"
              placeholder="Example: React, JavaScript, API Integration, Teamwork"
              value={formData.keySkills}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Job Description
            <textarea
              name="jobDescription"
              placeholder="Paste the job description here..."
              value={formData.jobDescription}
              onChange={handleChange}
              className="large-textarea"
            />
          </label>

          <label>
            Upload Resume PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </label>

          <div className="mock-row">
            <input
              id="useMock"
              type="checkbox"
              name="useMock"
              checked={formData.useMock}
              onChange={handleChange}
            />
            <label htmlFor="useMock">
              Use Mock AI Mode
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (
              <span className="loading-text">
                <span className="spinner"></span>
                Generating...
              </span>
            ) : (
              "Generate Cover Letter"
            )}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <div className="output-panel">
          <div className="output-header">
            <h2>Generated Letter</h2>

            <button
              type="button"
              className="copy-btn"
              onClick={copyToClipboard}
              disabled={!letter}
            >
              {copyText}
            </button>
          </div>

          <div className="letter-box">
            {letter ? (
              <pre>{letter}</pre>
            ) : (
              <p className="placeholder">
                Your cover letter will appear here after generation.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;