function makeFilename(s) {
    return s.replace(/\s|:/g, '_').replace(/[^A-Za-z0-9_\.\(\)=\-\+]/g, '').replace(/_+/g, '_');
}