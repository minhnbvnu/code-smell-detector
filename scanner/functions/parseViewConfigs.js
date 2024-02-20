function parseViewConfigs(inputs) {
        return mapHash(inputs, parseViewConfig);
    }