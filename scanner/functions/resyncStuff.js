function resyncStuff() {
    const deletedPrompts = getObject("deletedPrompts", [])
    const newPrompts = getObject("newPrompts", [])
    const changedPrompts = getObject("changedPrompts", [])
    const localPrompts = getPrompts()
    const sheetID = localStorage.getItem("sheetID")
    syncPrompts(deletedPrompts, newPrompts, changedPrompts, localPrompts, sheetID)
}