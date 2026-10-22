const inputView = document.getElementById("input-view");
const outputView = document.getElementById("output-view");
const translateBtn = document.getElementById("translate-btn");
const startOver = document.getElementById("start-over-btn");
const textArea = document.getElementById("input");
const originalText = document.getElementById("original-text");
const detectedLang = document.getElementById("detected-language");
const translatedLang = document.getElementById("translation-text");

async function showOutputView() {
    if (!textArea.value.trim()) {
        return
    }
    translateBtn.textContent = "Translating..."
    translateBtn.disabled = true;
    try {
        const result = await translateText(textArea.value);
        console.log(result);
        detectedLang.textContent = result.detectedLanguage;
        translatedLang.textContent = result.translation;
        originalText.textContent = textArea.value;
        inputView.style.display = "none";
        outputView.style.display = "block";
    } catch (error) {
        console.error(error);
        alert("Sorry, something went wrong. Please try again.")
    } finally {
        translateBtn.textContent = "Translate"
        translateBtn.disabled = false;
    }
}

textArea.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        showOutputView()
    }
})

translateBtn.addEventListener("click", showOutputView);

function hideOutputView() {
    outputView.style.display = "none";
    inputView.style.display = "block";
    textArea.value = ""
}

startOver.addEventListener("click", hideOutputView);

async function translateText(userPrompt) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
            model: "claude-haiku-5-5",
            max_tokens: 1024,
            system: "You are a translation bot, you will detect the language typed and always translate it to English. You will reply ONLY with a JSON object with two keys detectedLanguage and translation with no extra words and no markdown code fences around it",
            messages: [
                {role: "user", content: userPrompt}
            ]
        }),
    })
    console.log(res)
    if (!res.ok) {
        throw Error(res.message);
    } else {
        const data = await res.json();
        return JSON.parse(data.content[0].text)
    }
}

