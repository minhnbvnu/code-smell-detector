function getPropertyText(node) {
                const prefix = getPrefix(node);
                const lines = sourceCode.getText(node.property).split(astUtils.LINEBREAK_MATCHER);
                const suffix = node.computed && lines.length === 1 ? "]" : "";
                return prefix + lines[0] + suffix;
            }