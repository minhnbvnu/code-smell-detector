function navigatePrompts(direction) {
    const prompts = document.querySelectorAll(".prompt-item")
    const currentIndex = window.pgActivePrompt ?? -1

    if (direction === "ArrowDown" && currentIndex < prompts.length - 1) {
        const nextElement = prompts[currentIndex + 1]
        window.pgActivePrompt = currentIndex + 1
        nextElement.focus()
    } else if (direction === "ArrowUp" && currentIndex > 0) {
        const prevElement = prompts[currentIndex - 1]
        window.pgActivePrompt = currentIndex - 1
        prevElement.focus()
    }
}