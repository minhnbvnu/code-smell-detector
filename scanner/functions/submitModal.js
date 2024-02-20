function submitModal() {
            const varInputs = document.querySelectorAll(".pg-variable")
            let variables = []
            for (const varIn of varInputs) {
                variables.push(varIn.value)
            }
            document.getElementById("var-modal").remove()
            selectPrompt(replaceVariables(promptText, variables), false)
            setTimeout(() => chatInput.focus(), 80) // so not to add a newline
        }