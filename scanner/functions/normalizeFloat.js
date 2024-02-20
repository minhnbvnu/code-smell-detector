function normalizeFloat(stringFloat) {
                const trimmedFloat = removeLeadingZeros(stringFloat);
                if (trimmedFloat.startsWith(".")) {
                    const decimalDigits = trimmedFloat.split(".").pop();
                    const significantDigits = removeLeadingZeros(decimalDigits);
                    return {
                        magnitude: significantDigits.length - decimalDigits.length - 1,
                        coefficient: addDecimalPointToNumber(significantDigits)
                    };
                }
                return {
                    magnitude: trimmedFloat.indexOf(".") - 1,
                    coefficient: addDecimalPointToNumber(trimmedFloat.replace(".", ""))
                };
            }