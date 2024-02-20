function getModifiers(event) {
    var mods = [];
    if (event.ctrlKey) {
        mods.push('ctrl');
    }
    if (event.altKey) {
        mods.push('alt');
    }
    if (event.shiftKey) {
        mods.push('shift');
    }
    if (event.metaKey) {
        mods.push('meta');
    }
    return mods;
}