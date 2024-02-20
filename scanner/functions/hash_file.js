function hash_file(path) {
        const contents = (0, exports.read)(path);
        return contents != null ? hash(contents) : null;
    }