function parseValidBigInt(text) {
            const negative = text.startsWith("-");
            const base10Value = parsePseudoBigInt(`${negative ? text.slice(1) : text}n`);
            return { negative, base10Value };
        }