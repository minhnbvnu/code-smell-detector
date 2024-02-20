function verifySpacing(node, lineOptions) {
                const actual = getPropertyWhitespace(node);
                if (actual) { // Object literal getters/setters lack colons
                    report(node, "key", actual.beforeColon, lineOptions.beforeColon, lineOptions.mode);
                    report(node, "value", actual.afterColon, lineOptions.afterColon, lineOptions.mode);
                }
            }