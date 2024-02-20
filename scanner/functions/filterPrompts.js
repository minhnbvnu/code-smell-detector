function filterPrompts() {
    let input = document.getElementById("searchInput")
    let filter = input.value.toLowerCase()
    let promptsContainer = document.getElementById("promptsContainer")
    let prompts = promptsContainer.getElementsByClassName("prompt-item")
    let firstVisible = null

    for (let i = 0; i < prompts.length; i++) {
        let title = prompts[i].getElementsByClassName("prompt-title")[0]
        if (title.innerText.toLowerCase().indexOf(filter) > -1) {
            prompts[i].style.display = ""
            if (!firstVisible) firstVisible = prompts[i]
        } else {
            prompts[i].style.display = "none"
        }
    }
    window.pgActivePrompt = -1
}