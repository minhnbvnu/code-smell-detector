function handlePromptSelection(text) {
    console.log(text)
    const variableRegex = /{{(.*?)}}/g
    let match
    let variables = []
    let uniqueVariables = new Set() // Use a Set to ensure uniqueness

    // Extract unique variables from the text
    while ((match = variableRegex.exec(text)) !== null) {
        uniqueVariables.add(match[1])
    }

    // Convert the Set of variables to an Array
    variables = Array.from(uniqueVariables)

    // If no variables are present, copy text immediately
    if (variables.length === 0) {
        copyTextToClipboard(text)
        cleanup() // Clean up after copying
    } else {
        // Create a modal for the variables
        createVariableModal(variables, text)
    }
}