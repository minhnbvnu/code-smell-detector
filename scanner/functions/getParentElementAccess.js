function getParentElementAccess(node) {
                const ancestor = node.parent.parent;
                switch (ancestor.kind) {
                    case 205 /* BindingElement */:
                    case 299 /* PropertyAssignment */:
                        return getSyntheticElementAccess(ancestor);
                    case 206 /* ArrayLiteralExpression */:
                        return getSyntheticElementAccess(node.parent);
                    case 257 /* VariableDeclaration */:
                        return ancestor.initializer;
                    case 223 /* BinaryExpression */:
                        return ancestor.right;
                }
            }