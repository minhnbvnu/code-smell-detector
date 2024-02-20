function isUnknownOption(arg) {
                arg = arg.replace(/^-{3,}/, '--');
                if (arg.match(negative)) {
                    return false;
                }
                if (hasAllShortFlags(arg)) {
                    return false;
                }
                const flagWithEquals = /^-+([^=]+?)=[\s\S]*$/;
                const normalFlag = /^-+([^=]+?)$/;
                const flagEndingInHyphen = /^-+([^=]+?)-$/;
                const flagEndingInDigits = /^-+([^=]+?\d+)$/;
                const flagEndingInNonWordCharacters = /^-+([^=]+?)\W+.*$/;
                return !hasFlagsMatching(arg, flagWithEquals, negatedBoolean, normalFlag, flagEndingInHyphen, flagEndingInDigits, flagEndingInNonWordCharacters);
            }