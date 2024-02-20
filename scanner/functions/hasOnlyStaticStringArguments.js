function hasOnlyStaticStringArguments(node) {
                const args = node.arguments;
                if ((args.length === 1 || args.length === 2) && args.every(isStaticString)) {
                    return true;
                }
                return false;
            }