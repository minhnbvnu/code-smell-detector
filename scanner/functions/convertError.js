function convertError(error) {
        return (0, node_utils_1.createError)(error.file, error.start, ('message' in error && error.message) || error.messageText);
    }