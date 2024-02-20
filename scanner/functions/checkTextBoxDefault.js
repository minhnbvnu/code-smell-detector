function checkTextBoxDefault() {
        // detects when page has changed
        if (document.getElementById("prompt-textarea").placeholder !== placeholder) {
            let suggestions = document.getElementById("suggestions")
            function remove() {
                if (suggestions) suggestions.remove()
            }
            setTimeout(remove, 300)
            clearInterval(textBoxInterval)
            main(prompts)
        }
    }