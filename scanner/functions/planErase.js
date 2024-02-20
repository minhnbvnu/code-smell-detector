function planErase(index) {
    defaultArray.splice(index, 1);
    store.set("predefined-tasks", defaultArray);
    $("#item" + index).remove();
    store.set("settings-goto", "predefined-tasks");
    location.reload();
}