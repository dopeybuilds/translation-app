const inputView = document.getElementById("input-view");
const outputView = document.getElementById("output-view");
const translateBtn = document.getElementById("translate-btn");
const startOver = document.getElementById("start-over-btn");
const textArea = document.getElementById("input");
const originalText = document.getElementById("original-text");

function showOutputView() {
    if (!textArea.value.trim()) {
        return
    } 
    
    inputView.style.display = "none";
    outputView.style.display = "block";
    originalText.textContent = textArea.value;
    
}

translateBtn.addEventListener("click", showOutputView);

function hideOutputView() {
    outputView.style.display = "none";
    inputView.style.display = "block";
    textArea.value = ""
}

startOver.addEventListener("click", hideOutputView);