function chatInputEvents() {
        document.addEventListener("keyup", autoComplete, { capture: true })
        document.addEventListener("keydown", preventEnter, { capture: true })
        document.addEventListener("keypress", preventEnter, { capture: true })
    }