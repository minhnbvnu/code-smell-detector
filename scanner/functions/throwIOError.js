function throwIOError(message, error) {
        var errorMessage = message;
        if(error && error.message) {
            errorMessage += (" " + error.message);
        }
        throw new Error(errorMessage);
    }