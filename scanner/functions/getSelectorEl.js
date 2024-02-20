function getSelectorEl() {
    let selectorMatch = document.getElementsByTagName("dashboard-selector");
    if (selectorMatch.length > 0) {
        return selectorMatch[0];
    } else {
        throw `connectData: tag dashboard-selector not found`;
        return;
    }
}