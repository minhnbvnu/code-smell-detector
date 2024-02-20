function normalizeInteger(stringInteger) {
                const significantDigits = removeTrailingZeros(removeLeadingZeros(stringInteger));
                return {
                    magnitude: stringInteger.startsWith("0") ? stringInteger.length - 2 : stringInteger.length - 1,
                    coefficient: addDecimalPointToNumber(significantDigits)
                };
            }