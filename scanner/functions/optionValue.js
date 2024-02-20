function optionValue(options, name, default_value, type) {
    if (options && options[name] !== undefined) {
        if (type === 'int') {
            return options[name] | 0;
        }
        return options[name];
    }
    return default_value;
}