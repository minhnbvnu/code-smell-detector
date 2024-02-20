async function selectPrompt(promptText, hasVars = true) {
        let chatInput = document.querySelector("#prompt-textarea")
        removeSuggestion()
        const vars = hasVars ? findVariables(promptText) : [] // so if the chosen variable has a variable within {{}}
        if (vars.length > 0) {
            getVarsFromModal(vars, promptText)
            return ""
        }
        const searchTerm = chatInput.value
            .substring(chatInput.value.lastIndexOf("/") + 1)
            .split(" ")[0]
        const lastSlashIndex = chatInput.value.lastIndexOf("/")
        const lastSearchTermIndex = lastSlashIndex + searchTerm.length + 1
        chatInput.style.height = "200px"
        chatInput.parentElement.querySelector("button").addEventListener("click", () => {
            chatInput.style.height = "24px"
        })
        const newText =
            chatInput.value.substring(0, lastSlashIndex) +
            promptText +
            chatInput.value.substring(lastSearchTermIndex)
        console.log(newText)
        chatInput.value = newText
        autocomplete = false
    }