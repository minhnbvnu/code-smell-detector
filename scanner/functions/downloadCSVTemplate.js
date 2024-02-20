function downloadCSVTemplate() {
    // Encode the CSV string as a Blob
    const blob = encodeStringAsBlob(
        "Title,Text,Description,Folder,Tags - Separated with semicolons",
    )

    const filename = "AI_Prompt_Genius_Template.csv"
    // Download the Blob as a CSV file
    downloadBlobAsFile(blob, filename)
}