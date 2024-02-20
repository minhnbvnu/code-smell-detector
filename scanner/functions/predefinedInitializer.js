function predefinedInitializer() {
    defaultArray.forEach(function (item, index, array) {
        planAppend(item, index);
    });
    if (store.has("default-task")) setAsDefault(store.get("default-task"));
}