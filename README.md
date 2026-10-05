
# TruthCheck-AI 🤖

AI-powered news and claim verification system that helps users determine whether a piece of information is likely to be real or misleading.

## 🌐 Live Demo

**Website:** https://truth-check-ai-backend.vercel.app

**Backend:** https://truth-check-ai-zeta.vercel.app

## 📌 About the Project

TruthCheck-AI is a web-based fact-checking application designed to analyze news headlines, statements, and online claims using Google's Gemini AI.

Users can enter a claim or news statement, and the application sends it to the backend for AI-powered analysis. The result provides a verdict, confidence level, and explanation.

## ✨ Features

- 🔍 Verify news and online claims
- 🤖 AI-powered analysis using Google Gemini
- 📊 Confidence score for verification results
- 📝 Explanation of the AI's decision
- 🌐 Fully deployed using Vercel
- ⚡ Simple and responsive user interface
- 🔐 API key stored securely on the backend

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- Google Gemini API
- CORS
- dotenv

### Deployment
- GitHub
- Vercel

## 📁 Project Structure

```text
TruthCheck-AI/
│
├── index.html
├── script.js
├── style.css
│
└── backend/
    ├── server.js
    ├── package.json
    ├── package-lock.json
    └── .env
````

## ⚙️ How It Works

```text
User enters a claim
        ↓
Frontend sends claim to backend
        ↓
Express.js API receives the claim
        ↓
Gemini AI analyzes the claim
        ↓
Backend returns the result
        ↓
Frontend displays verdict and confidence
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/sachinkumaraj/TruthCheck-AI.git
cd TruthCheck-AI
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure the Gemini API key

Create a `.env` file inside the `backend` folder:

```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Start the backend

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Open the frontend

Open `index.html` in your browser.

## 🔐 Environment Variables

The Gemini API key should never be committed to GitHub.

The project uses:

```env
GEMINI_API_KEY=your_api_key_here
```

For production deployment, the API key is stored as a Vercel environment variable.

## 📸 Screenshots

Add screenshots of the application here.

Example:

```text
![TruthCheck-AI Homepage](screenshot.png)
```

## 🔮 Future Improvements

* Add source citations for verified claims
* Improve AI verification accuracy
* Add user history
* Add multiple AI models
* Add multilingual support
* Add browser extension support
* Add real-time news verification
* Improve fact-checking using multiple trusted sources

## 👨‍💻 Developer

**Sachin Kumar**

GitHub:
[https://github.com/sachinkumaraj](https://github.com/sachinkumaraj)

## 📄 License

This project is created for educational and demonstration purposes.

````

### 3. Then save it

After pasting:

**Scroll down → Commit changes**

For the commit message, use:

```text
Add project README
````

Then click **Commit changes**.

Your GitHub repository will then have a proper project description instead of the empty **“Add a README”** section. 🚀
