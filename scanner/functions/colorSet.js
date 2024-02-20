function colorSet(id) {
    ipc.send("logger", $("#color-" + id).val());
    themeColorList[id] = $("#color-" + id).val();
    store.set("theme-color", themeColorList);
}