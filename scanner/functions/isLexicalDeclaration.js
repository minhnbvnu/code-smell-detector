function isLexicalDeclaration(node) {
                switch (node.type) {
                    case "FunctionDeclaration":
                    case "ClassDeclaration":
                        return true;
                    case "VariableDeclaration":
                        return node.kind !== "var";
                    default:
                        return false;
                }
            }