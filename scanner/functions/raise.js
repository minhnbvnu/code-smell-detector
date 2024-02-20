function raise(message) {
            var error = new Error('(regl) ' + message);
            console.error(error);
            throw error;
        }