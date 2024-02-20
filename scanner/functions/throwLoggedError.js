function throwLoggedError() {
            err.message = msg + err.message;
            throw err;
        }