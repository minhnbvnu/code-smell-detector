function isNaNValue(payload) {
        return getType(payload) === 'Number' && isNaN(payload);
    }