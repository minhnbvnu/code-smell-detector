async function createSpreadsheet(token) {
    // creates a new Google Sheet for Syncing
    const metadata = {
        name: "AI Prompt Genius",
        mimeType: "application/vnd.google-apps.spreadsheet",
    }
    try {
        const response = await fetch("https://www.googleapis.com/drive/v3/files", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(metadata),
        })
        if (!response.ok) {
            handleError(response)
            throw new Error("Failed to create new spreadsheet")
        }
        const jsonResponse = await response.json()
        return jsonResponse.id
    } catch (error) {
        console.error(error)
    }
}