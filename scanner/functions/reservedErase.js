function reservedErase(index) {
    reservedArray.splice(index, 1);
    store.set("reserved", reservedArray);
    store.set("reserved-cnt", store.get("reserved-cnt") - 1);
    $("#reserved-" + index).remove();
    store.set("settings-goto", "task-reservation");
    location.reload();
}