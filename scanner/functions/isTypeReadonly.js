function isTypeReadonly(checker, type, options = exports.readonlynessOptionsDefaults) {
        return (isTypeReadonlyRecurser(checker, type, options, new Set()) ===
            3 /* Readonlyness.Readonly */);
    }