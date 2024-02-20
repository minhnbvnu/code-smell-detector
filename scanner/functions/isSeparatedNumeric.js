function isSeparatedNumeric(node) {
                return typeof node.value === 'number' && node.raw.includes('_');
            }