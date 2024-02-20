function loadTXT(txtURL, definition, outputObject, outputField, callback) {
    console.assert(outputObject);
    loadManager.fetch(txtURL, 'text', null, function (text) {
        // Convert to unix newlines
        outputObject[outputField] = text.replace(/\r/g, '');
        if (callback) { callback(); }
    });
}