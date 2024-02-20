function parseLineHeight(value) {
                const parsed = parseFloat(value);
                if (parsed.toString() === value) {
                    return parsed;
                }
                return value;
            }