function generateFilename(image) {
    try {
        // sometime at intial bootup, seeding is not available.
        // crypto sync version is comparable to async in perf as bytes are much smaller.
        return crypto.randomBytes(12).toString('hex') + image.originalName;
    }
    catch(e) {
        log.warn(e, 'Failed to generate filename via crypto.randomBytes.');
        return Date.now() + image.originalName;
    }
}