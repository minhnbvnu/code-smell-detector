function guessFilter(keyword = '') {
    if (keyword.length === 0) return {};

    let compareString = keyword;

    if (['>', '<', '='].includes(compareString[0])) {
        compareString = keyword.slice(1);
    } else if (compareString.startsWith('!=')) {
        compareString = keyword.slice(2);
    }

    if (keyword.startsWith('>')) {
        if (compareString) {
            return {
                type: 'greaterThan',
                text: compareString.trim()
            };
        }
    }

    if (keyword.startsWith('<')) {
        if (compareString) {
            return {
                type: 'lessThan',
                text: compareString.trim()
            };
        }
    }

    if (keyword.startsWith('=')) {
        if (isNumber(compareString)) {
            return {
                type: 'equals',
                text: Number(keyword.slice(1).trim())
            };
        }
    }

    if (isNumber(compareString)) {
        return {
            type: 'containsNumber',
            text: compareString
        };
    }

    if (keyword.startsWith('!=')) {
        if (isNumber(compareString)) {
            return {
                type: 'notEquals',
                text: Number(keyword.slice(2).trim())
            };
        }
    }

    if (keyword.split(':').length === 2 && keyword.split(':').every(v => isNumber(v.trim()))) {
        compareString = keyword.split(':');
        return {
            type: 'range',
            text: compareString.map(v => v.trim())
        };
    }

    return {
        type: 'contains',
        text: compareString.toLowerCase()
    };
}