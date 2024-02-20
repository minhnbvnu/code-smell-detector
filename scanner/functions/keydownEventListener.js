function keydownEventListener(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault()
        navigatePrompts(event.key)
    }
    if (event.key === "Enter") {
        event.preventDefault()
        const active = document.activeElement
        if (active && active.classList.contains("prompt-item")) {
            active.click()
        }
    }
}