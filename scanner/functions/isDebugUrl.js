function isDebugUrl(url) {
    return /(^|\/)([Dd]ebug|[Tt]est).pyxl$/.test(url);
}