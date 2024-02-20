function defaultSourceLookup(path) {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (ex) {
        throw new Error(`Unable to lookup source: ${path} (${ex.message})`);
    }
}