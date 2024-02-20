function toggleCase(str) {
    let itemText = ""
    str.split("").forEach(item => {
        if (/^([a-z]+)/.test(item)) {
            itemText += item.toUpperCase();
        } else if (/^([A-Z]+)/.test(item)) {
            itemText += item.toLowerCase();
        } else {
            itemText += item;
        }
    });
    return itemText;
}