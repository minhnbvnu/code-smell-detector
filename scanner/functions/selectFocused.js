function selectFocused() {
        const focused = document.querySelector(".autocomplete-active")
        if (focused) {
            const promptId = focused.getAttribute("data-prompt-id4")
            selectPrompt(prompts.find(prompt => prompt.id === promptId)?.text)
        }
        removeSuggestion()
    }