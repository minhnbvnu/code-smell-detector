function isPrimaryMouseButton(ev) {
    return ev.which === 1 && !ev.ctrlKey;
}