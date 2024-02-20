function isTypeAnyType(type) {
        if ((0, typeFlagUtils_1.isTypeFlagSet)(type, ts.TypeFlags.Any)) {
            if (type.intrinsicName === 'error') {
                log('Found an "error" any type');
            }
            return true;
        }
        return false;
    }