function valueToString(value) {
        try {
            return JSON.stringify(value);
        }
        catch (_a) {
            return value.toString();
        }
    }