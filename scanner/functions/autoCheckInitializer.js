function autoCheckInitializer() {
    if (store.get("autocheck") !== false)
        $("#selection-autocheck").prop("checked", true);
}