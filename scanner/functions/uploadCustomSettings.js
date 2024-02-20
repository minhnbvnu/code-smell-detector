async function uploadCustomSettings(event, fileInput) {
    event.stopPropagation()
    event.preventDefault()

    const file = fileInput.files[0]
    const fileType = file?.name.split(".").pop()

    if (fileType == "json") {
        const fileText = await file.text()
        const uploadedSettings = JSON.parse(fileText)
        updateCustomSettings(uploadedSettings)
    }
}