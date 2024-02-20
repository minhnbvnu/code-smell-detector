function globalProcessExit(code) {
        if ((typeof process === 'object') && (process !== null) && (typeof process.exit === 'function')) {
            return process.exit(code);
        }
    }