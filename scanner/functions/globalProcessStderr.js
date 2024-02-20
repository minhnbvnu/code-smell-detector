function globalProcessStderr() {
        if ((typeof process === 'object') && (process !== null)) {
            return process.stderr;
        }
    }