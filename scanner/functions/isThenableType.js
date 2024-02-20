function isThenableType(node) {
                const type = checker.getTypeAtLocation(node);
                return tsutils.isThenableType(checker, node, type);
            }