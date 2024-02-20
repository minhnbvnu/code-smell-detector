function stripHtmlEntities(text) {
    return text.replace(/&.*?;/g, '');
}