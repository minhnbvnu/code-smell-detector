function createVariableModal(variables, text) {
    document.getElementById("modal-pg").style.display = "none"
    const copyStr = chrome.i18n.getMessage("copy").toUpperCase()
    const enterVal = chrome.i18n.getMessage("enter_val")

    // Generate HTML for variable inputs
    let variableInputs = variables
        .map(
            variable => `
                <div class="input-group">
                    <label class="input-label" for="input-${variable}">${variable}</label>
                    <textarea id="input-${variable}" placeholder="${enterVal} ${variable}..." class="variable-input"></textarea>
                </div>
            `,
        )
        .join("")

    // Create the variable modal HTML
    let variableModalHTML = `
        <div id="variable-modal" class="variable-modal">
            <div class="variable-modal-content">
                ${variableInputs}
                <button id="copyButton" class="copy-button">${copyStr}</button>
            </div>
        </div>
    `

    // Insert the modal into the DOM
    document.body.insertAdjacentHTML("beforeend", variableModalHTML)

    // Focus on the first input
    document.querySelector(".variable-input").focus()

    // Add event listener for the COPY button
    document.getElementById("copyButton").addEventListener("click", () => copyVariableText(text))
    document.getElementById("copyButton").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            copyVariableText(text)
        }
    })

    // Add keydown event listener to each textarea to listen for the Enter key
    document.querySelectorAll(".variable-input").forEach(textarea => {
        textarea.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && event.shiftKey) {
                // Add a newline at the current cursor position
                const start = this.selectionStart
                const end = this.selectionEnd
                this.value = this.value.substring(0, start) + "\n" + this.value.substring(end)

                // Move the cursor to the right position after the newline
                this.selectionStart = this.selectionEnd = start + 1

                // Prevent the default action to avoid moving to the next element
                event.preventDefault()
            } else if (event.key === "Enter" && !event.shiftKey) {
                // Prevent the default action to avoid a newline in textarea
                event.preventDefault()
                // Call the function to copy text
                copyVariableText(text)
            }
        })
    })
}