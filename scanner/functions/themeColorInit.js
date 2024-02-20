function themeColorInit() {
    const defaultColors = [
        "#5490ea",
        "#ea5454",
        "#17a2b8",
        "#a26ae5"
    ];
    if (!store.has("theme-color")) {
        store.set("theme-color", defaultColors);
    }
}