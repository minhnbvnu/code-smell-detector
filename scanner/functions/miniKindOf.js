function miniKindOf(val) {
                        if (val === void 0)
                            return 'undefined';
                        if (val === null)
                            return 'null';
                        var type = typeof val;
                        switch (type) {
                            case 'boolean':
                            case 'string':
                            case 'number':
                            case 'symbol':
                            case 'function':
                                {
                                    return type;
                                }
                        }
                        if (Array.isArray(val))
                            return 'array';
                        if (isDate(val))
                            return 'date';
                        if (isError(val))
                            return 'error';
                        var constructorName = ctorName(val);
                        switch (constructorName) {
                            case 'Symbol':
                            case 'Promise':
                            case 'WeakMap':
                            case 'WeakSet':
                            case 'Map':
                            case 'Set':
                                return constructorName;
                        } // other
                        return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
                    }