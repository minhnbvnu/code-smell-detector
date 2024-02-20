function isCharacter(node) {
                const evaluated = (0, util_1.getStaticValue)(node, globalScope);
                return (evaluated != null &&
                    typeof evaluated.value === 'string' &&
                    // checks if the string is a character long
                    evaluated.value[0] === evaluated.value);
            }