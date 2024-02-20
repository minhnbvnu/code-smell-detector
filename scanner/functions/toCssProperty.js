function toCssProperty(result, item, key) {
            return result + (typeof item === 'string' || typeof item === 'number' ? key + ':' + item + ';' : '');
        }