function toProgramEmitPending(value, options) {
            return !value ? getBuilderFileEmit(options || {}) : value;
        }