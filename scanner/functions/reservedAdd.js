function reservedAdd() {
    reservedArray.push(newReservedItem);
    reservedListReorder();
    store.set("reserved-record", store.get("reserved-record") + 1);
    newReservedItem.id = store.get("reserved-record") + 1;
    store.set("reserved-cnt", store.get("reserved-cnt") + 1);
    reservedAppend(newReservedItem, reservedArray.length - 1);
    store.set("settings-goto", "task-reservation");
    location.reload();
}