function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
        const propType = {}.propertyIsEnumerable.call(originalObject, key)
            ? 'enumerable'
            : 'nonenumerable';
        if (propType === 'enumerable')
            carry[key] = newVal;
        if (includeNonenumerable && propType === 'nonenumerable') {
            Object.defineProperty(carry, key, {
                value: newVal,
                enumerable: false,
                writable: true,
                configurable: true,
            });
        }
    }