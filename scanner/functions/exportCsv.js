function exportCsv() {
    const promptArray = getObject("prompts", [])

    const newPrompts = promptArray.map(prompt => {
        return {
            title: prompt.title,
            content: prompt.text,
            description: prompt.description,
            folder: prompt.folder,
            tags: prompt.tags.join(";"),
        }
    })
    const currentTimeString = new Date().toJSON()
    const filename = `AI-Prompt-Genius-Prompts_${currentTimeString}.csv`

    const csv = convertToCSV(newPrompts)

    // Encode the CSV string as a Blob
    const blob = encodeStringAsBlob(csv)

    // Download the Blob as a CSV file
    downloadBlobAsFile(blob, filename)
}