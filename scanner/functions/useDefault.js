function useDefault(value, defaultValue) {
        return value === undefined || value === '' ? defaultValue : value;
    }