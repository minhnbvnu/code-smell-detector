function stat(path, optionsOrSettingsOrCallback, callback) {
        if (typeof optionsOrSettingsOrCallback === 'function') {
            async.read(path, getSettings(), optionsOrSettingsOrCallback);
            return;
        }
        async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
    }