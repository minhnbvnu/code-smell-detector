function standardTypeEh(value, type) {
            switch (type) {
                case 'number': return typeof value === 'number';
                case 'object': return typeof value === 'object';
                case 'string': return typeof value === 'string';
                case 'boolean': return typeof value === 'boolean';
                case 'function': return typeof value === 'function';
                case 'undefined': return typeof value === 'undefined';
                case 'symbol': return typeof value === 'symbol';
            }
        }