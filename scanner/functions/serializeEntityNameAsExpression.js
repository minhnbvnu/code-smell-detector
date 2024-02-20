function serializeEntityNameAsExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        const name = setParent(setTextRange(parseNodeFactory.cloneNode(node), node), node.parent);
                        name.original = void 0;
                        setParent(name, getParseTreeNode(currentLexicalScope));
                        return name;
                    case 163 /* QualifiedName */:
                        return serializeQualifiedNameAsExpression(node);
                }
            }