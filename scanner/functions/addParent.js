function addParent(obj, parent) {
        var isNode = obj && typeof obj.type === 'string';
        var childParent = isNode ? obj : parent;
        for (var k in obj) {
            var value = obj[k];
            if (Array.isArray(value)) {
                value.forEach(function (v) { addParent(v, childParent); });
            }
            else if (value && typeof value === 'object') {
                addParent(value, childParent);
            }
        }
        if (isNode) {
            Object.defineProperty(obj, 'parent', {
                configurable: true,
                writable: true,
                enumerable: false,
                value: parent || null
            });
        }
        return obj;
    }