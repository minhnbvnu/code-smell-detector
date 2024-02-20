function isFatalError(settings, error) {
        if (settings.errorFilter === null) {
            return true;
        }
        return !settings.errorFilter(error);
    }