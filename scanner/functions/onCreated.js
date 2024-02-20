function onCreated(error, response) {
        if (error) {
            console.trace(error);
            console.dir(error);
            throw new Error('Failed to initialize context.spooky: ' +
                error.code + ' - '  + error.message);
        }

        done();
    }