function toCharacterClass(a, b, options) {
        return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
    }