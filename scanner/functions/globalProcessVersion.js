function globalProcessVersion() {
        if ((typeof process === 'object') && (process !== null)) {
            return process.version;
        }
        else {
            return '';
        }
    }