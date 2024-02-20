function makeDateFilename() {
    const now = new Date();
    const dateString = now.getFullYear() + '-' + twoDigit(now.getMonth() + 1) + '-' + twoDigit(now.getDate()) + '_' + twoDigit(now.getHours()) + 'h' + twoDigit(now.getMinutes());
    const tag = ((gameSource.debug && gameSource.debug.json && gameSource.debug.json.screenshot_tag_enabled) ? gameSource.debug.json.screenshot_tag : gameSource.json.screenshot_tag).trim();
    return makeFilename(dateString + (tag === '' ? '' : '_') + tag);
}