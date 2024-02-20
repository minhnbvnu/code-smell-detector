function copyVariableText(text) {
    let variableValues = {}
    document.querySelectorAll(".variable-input").forEach(input => {
        let variableName = input.id.replace("input-", "")
        variableValues[variableName] = input.value
    })

    console.log(variableValues)
    console.log(text)

    // Replace variables in the original text and copy to clipboard
    for (const [variable, value] of Object.entries(variableValues)) {
        text = text.replace(new RegExp(`{{${variable}}}`, "g"), value)
    }

    // Copy the text to clipboard
    copyTextToClipboard(text)
    // Cleanup after copying
    cleanup()
}