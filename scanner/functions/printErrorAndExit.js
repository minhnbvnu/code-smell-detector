function printErrorAndExit(error) {
        var source = getErrorSource(error);
        // Ensure error is printed synchronously and not truncated
        var stderr = globalProcessStderr();
        if (stderr && stderr._handle && stderr._handle.setBlocking) {
            stderr._handle.setBlocking(true);
        }
        if (source) {
            console.error();
            console.error(source);
        }
        console.error(error.stack);
        globalProcessExit(1);
    }