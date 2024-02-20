function parseVersionJS(text) {
        try {
            text = text.match(/^ *const *version *= *['"]([0-9.]+)['"] *;/)[1];
            const match = text.split('.').map(x => parseInt(x, 10));

            // Months and years have varying length. That doesn't matter.  We
            // don't need a linear time number. We need one that monotonically
            // increases. Think of this as parsing a number with an irregular
            // base per digit.
            return {value: ((match[0] * 12 + match[1]) * 32 + match[2]) * 24 + match[3],
                    text: text};
        } catch {
            return {value: 0, text: text};
        }
    }