function finishAuth() {
    // checks localstorage for current auth task and then uses fresh API token to do it
    const authTask = localStorage.getItem("authTask")
    const token = localStorage.getItem("GOOGLE_API_TOKEN")

    if (authTask === "setupSync") {
        linkSheet(token)
    } else if (authTask === "resyncPrompts") {
        resyncStuff()
    } else if (authTask === "unlinkGsheet") {
        unlinkGsheet()
    }

    clearAuthTask()
}