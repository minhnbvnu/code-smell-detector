function parseRegExp(node) {
                const evaluated = (0, util_1.getStaticValue)(node, globalScope);
                if (evaluated == null || !(evaluated.value instanceof RegExp)) {
                    return null;
                }
                const { source, flags } = evaluated.value;
                const isStartsWith = source.startsWith('^');
                const isEndsWith = source.endsWith('$');
                if (isStartsWith === isEndsWith ||
                    flags.includes('i') ||
                    flags.includes('m')) {
                    return null;
                }
                const text = parseRegExpText(source, flags.includes('u'));
                if (text == null) {
                    return null;
                }
                return { isEndsWith, isStartsWith, text };
            }