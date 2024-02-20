function reservedListReorder() {
    let newReservedArray = [];
    for (let i in reservedArray) {
        if (reservedArray[i].cycle.indexOf("0") !== -1) {
            newReservedArray.unshift(reservedArray[i]);
        } else {
            newReservedArray.push(reservedArray[i]);
        }
    }

    store.set("reserved", newReservedArray);
}