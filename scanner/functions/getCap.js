function getCap(str) {
                const firstChar = str.charAt(0);
                const firstCharLower = firstChar.toLowerCase();
                const firstCharUpper = firstChar.toUpperCase();
                if (firstCharLower === firstCharUpper) {
                    // char has no uppercase variant, so it's non-alphabetic
                    return "non-alpha";
                }
                if (firstChar === firstCharLower) {
                    return "lower";
                }
                return "upper";
            }