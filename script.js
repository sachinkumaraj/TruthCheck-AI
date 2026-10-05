const newsInput = document.getElementById("newsInput");
const verifyButton = document.getElementById("verifyButton");

const result = document.getElementById("result");
const resultIcon = document.getElementById("resultIcon");
const resultStatus = document.getElementById("resultStatus");
const resultExplanation = document.getElementById("resultExplanation");
const confidenceScore = document.getElementById("confidenceScore");
const resultProgress = document.getElementById("resultProgress");

verifyButton.addEventListener("click", verifyNews);

async function verifyNews() {
    const news = newsInput.value.trim();

    // Check empty input
    if (!news) {
        alert("Please enter a news claim or article first.");
        newsInput.focus();
        return;
    }

    // Show loading state
    verifyButton.disabled = true;
    verifyButton.textContent = "VERIFYING...";

    result.classList.remove("hidden");

    resultIcon.textContent = "⏳";
    resultStatus.textContent = "ANALYZING...";
    resultExplanation.textContent =
        "TruthCheck AI is analyzing the claim. Please wait...";
    confidenceScore.textContent = "0%";
    resultProgress.style.width = "0%";

    // Remove previous result classes
    result.classList.remove(
        "result-real",
        "result-fake",
        "result-uncertain"
    );

    try {
        const response = await fetch("http://localhost:5000/api/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                news: news
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Unable to verify the news claim."
            );
        }

        // Get result from backend
        const verdict = String(data.verdict || "UNCERTAIN").toUpperCase();
        const confidence = Number(data.confidence) || 0;
        const explanation =
            data.explanation || "No explanation was provided.";

        // Display explanation
        resultExplanation.textContent = explanation;

        // Display confidence
        confidenceScore.textContent = `${confidence}%`;
        resultProgress.style.width = `${confidence}%`;

        // Display verdict
        if (verdict === "REAL") {
            resultIcon.textContent = "✓";
            resultStatus.textContent = "REAL";
            result.classList.add("result-real");
        } else if (verdict === "FAKE") {
            resultIcon.textContent = "✕";
            resultStatus.textContent = "FAKE";
            result.classList.add("result-fake");
        } else {
            resultIcon.textContent = "?";
            resultStatus.textContent = "UNCERTAIN";
            result.classList.add("result-uncertain");
        }

        // Scroll to result
        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    } catch (error) {
        console.error("Verification error:", error);

        resultIcon.textContent = "⚠";
        resultStatus.textContent = "ERROR";
        resultExplanation.textContent =
            error.message ||
            "Something went wrong while connecting to TruthCheck AI.";

        confidenceScore.textContent = "0%";
        resultProgress.style.width = "0%";

        result.classList.remove(
            "result-real",
            "result-fake",
            "result-uncertain"
        );
        result.classList.add("result-uncertain");

    } finally {
        // Restore button
        verifyButton.disabled = false;
        verifyButton.textContent = "VERIFY NEWS";
    }
}