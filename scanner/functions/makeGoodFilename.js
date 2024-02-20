function makeGoodFilename(text) {
    let filename = text.replace(/[ \n\t]/g, '_').replace(/[^A-Za-z0-9_+-]/g, '');

    const MAX_FILENAME_LENGTH = 50;
    if (filename.length > MAX_FILENAME_LENGTH) {
        // Break after an underscore
        let i = filename.indexOf('_', MAX_FILENAME_LENGTH * 0.85);
        if (i === -1) { i = MAX_FILENAME_LENGTH; }
        filename = filename.substring(0, i);
    }
    return filename.toLowerCase();
}