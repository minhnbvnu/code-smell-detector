function are_similar(a, b) {
        if (a === b) {
            return true;
        }
        if (Array.isArray(a)) {
            if (Array.isArray(b) && a.length === b.length) {
                var i;
                for (i = 0; i < a.length; i += 1) {
                    if (!are_similar(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        if (Array.isArray(b)) {
            return false;
        }
        if (a.id === '(number)' && b.id === '(number)') {
            return a.number === b.number;
        }
        if (a.arity === b.arity && a.string === b.string) {
            switch (a.arity) {
            case 'prefix':
            case 'suffix':
            case undefined:
                return a.id === b.id && are_similar(a.first, b.first);
            case 'infix':
                return are_similar(a.first, b.first) &&
                    are_similar(a.second, b.second);
            case 'ternary':
                return are_similar(a.first, b.first) &&
                    are_similar(a.second, b.second) &&
                    are_similar(a.third, b.third);
            case 'function':
            case 'regexp':
                return false;
            default:
                return true;
            }
        } else {
            if (a.id === '.' && b.id === '[' && b.arity === 'infix') {
                return a.second.string === b.second.string && b.second.id === '(string)';
            } else if (a.id === '[' && a.arity === 'infix' && b.id === '.') {
                return a.second.string === b.second.string && a.second.id === '(string)';
            }
        }
        return false;
    }