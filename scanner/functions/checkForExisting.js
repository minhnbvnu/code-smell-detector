async function checkForExisting(token) {
    // Checks for existing Gsheet in the API
    const endpointUrl =
        "https://www.googleapis.com/drive/v3/files" +
        "?fields=files(id,name,mimeType,createdTime)" +
        "&q=trashed=false"
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${token}`)
    try {
        const response = await fetch(endpointUrl, {
            method: "GET",
            headers: headers,
        })
        if (!response.ok) {
            throw new Error("Failed to fetch data from endpoint")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error:", error)
    }
}