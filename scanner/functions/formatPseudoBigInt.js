function formatPseudoBigInt(v) {
        return `${v.negative ? '-' : ''}${v.base10Value}n`;
    }