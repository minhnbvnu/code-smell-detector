function checkForResync() {
    const lastSynced = Number(localStorage.getItem("lastSynced")) ?? 0
    if (moreThan5Min(lastSynced)) {
        localStorage.setItem("authTask", "resyncPrompts")
        newToken()
    }
}