function isDynamic(x) {
            return (typeof x === 'function' && !x._reglType) || (x instanceof DynamicVariable);
        }