function planAdd() {
    let tempItem = newItem;
    defaultArray.push(tempItem);
    store.set("predefined-tasks", defaultArray);
    planAppend(tempItem, defaultArray.length - 1);
    store.set("settings-goto", "predefined-tasks");
    location.reload();
}