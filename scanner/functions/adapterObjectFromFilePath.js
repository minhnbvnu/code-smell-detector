function adapterObjectFromFilePath(filePath) {
    try {
        return require(filePath);
    } catch (e) {
        var error = new Error("Error `require`ing adapter file " + filePath + "\n\n" + e);
        error.cause = e;

        throw error;
    }
}