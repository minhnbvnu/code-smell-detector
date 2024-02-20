async function unlinkGsheet() {
    const message = { message: "clearCachedTokens" }
    const messageStr = JSON.stringify(message)
    window.parent.postMessage(messageStr, "*")
    const current_token = localStorage.getItem("GOOGLE_API_TOKEN")
    console.log(current_token)
    const response = await fetch(
        `https://accounts.google.com/o/oauth2/revoke?token=${encodeURIComponent(current_token)}`,
        {
            method: "GET",
        },
    )

    setObject("cloudSyncing", false)
    setObject("deletedPrompts", [])
    setObject("changedPrompts", [])
    setObject("newPrompts", [])

    if (response.ok) {
        handleError(response)
        localStorage.setItem("finishedAuthEvent", "Successfully disabled cloud syncing")
    } else {
        localStorage.setItem("finishedAuthEvent", "Error syncing prompts")
    }

    localStorage.removeItem("sheetID")
}