function isUnnecessarilyWrappedRegexLiteral(node) {
                const args = node.arguments;
                if (args.length === 1 && isRegexLiteral(args[0])) {
                    return true;
                }
                if (args.length === 2 && isRegexLiteral(args[0]) && isStaticString(args[1])) {
                    return true;
                }
                return false;
            }