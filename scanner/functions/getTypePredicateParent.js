function getTypePredicateParent(node) {
                switch (node.parent.kind) {
                    case 216 /* ArrowFunction */:
                    case 176 /* CallSignature */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 181 /* FunctionType */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        const parent2 = node.parent;
                        if (node === parent2.type) {
                            return parent2;
                        }
                }
            }