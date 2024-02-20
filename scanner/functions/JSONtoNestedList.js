function JSONtoNestedList(prompts) {
    if (prompts.length === 0) {
        return [
            ["folder", "date", "id", "lastChanged", "tags", "text", "time", "title", "description"],
        ]
    }

    prompts = prompts

    const headers = [
        "folder",
        "date",
        "id",
        "lastChanged",
        "tags",
        "text",
        "time",
        "title",
        "description",
    ]

    const values = []

    // Add headers to the values array
    values.push(headers)

    // Loop through each prompt in the array
    for (let prompt of prompts) {
        const promptValues = []

        // Loop through each header and check if the prompt has the key
        for (let header of headers) {
            if (Object.prototype.hasOwnProperty.call(prompt, header)) {
                // If the prompt has the key, add the value to the promptValues array
                if (Array.isArray(prompt[header])) {
                    promptValues.push(prompt[header].join(";"))
                } else {
                    promptValues.push(prompt[header])
                }
            } else {
                // If the prompt does not have the key, add an empty string to the promptValues array
                promptValues.push("")
            }
        }

        // Add the promptValues array to the values array
        values.push(promptValues)
    }

    return values
}