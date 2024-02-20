function createNotEmittedStatement(original) {
                const node = createBaseNode(355 /* NotEmittedStatement */);
                node.original = original;
                setTextRange(node, original);
                return node;
            }