function isPartOfTypeNode(node) {
            if (179 /* FirstTypeNode */ <= node.kind && node.kind <= 202 /* LastTypeNode */) {
                return true;
            }
            switch (node.kind) {
                case 131 /* AnyKeyword */:
                case 157 /* UnknownKeyword */:
                case 148 /* NumberKeyword */:
                case 160 /* BigIntKeyword */:
                case 152 /* StringKeyword */:
                case 134 /* BooleanKeyword */:
                case 153 /* SymbolKeyword */:
                case 149 /* ObjectKeyword */:
                case 155 /* UndefinedKeyword */:
                case 144 /* NeverKeyword */:
                    return true;
                case 114 /* VoidKeyword */:
                    return node.parent.kind !== 219 /* VoidExpression */;
                case 230 /* ExpressionWithTypeArguments */:
                    return isHeritageClause(node.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(node);
                case 165 /* TypeParameter */:
                    return node.parent.kind === 197 /* MappedType */ || node.parent.kind === 192 /* InferType */;
                case 79 /* Identifier */:
                    if (node.parent.kind === 163 /* QualifiedName */ && node.parent.right === node) {
                        node = node.parent;
                    }
                    else if (node.parent.kind === 208 /* PropertyAccessExpression */ && node.parent.name === node) {
                        node = node.parent;
                    }
                    Debug.assert(node.kind === 79 /* Identifier */ || node.kind === 163 /* QualifiedName */ || node.kind === 208 /* PropertyAccessExpression */, "'node' was expected to be a qualified name, identifier or property access in 'isPartOfTypeNode'.");
                case 163 /* QualifiedName */:
                case 208 /* PropertyAccessExpression */:
                case 108 /* ThisKeyword */: {
                    const { parent: parent2 } = node;
                    if (parent2.kind === 183 /* TypeQuery */) {
                        return false;
                    }
                    if (parent2.kind === 202 /* ImportType */) {
                        return !parent2.isTypeOf;
                    }
                    if (179 /* FirstTypeNode */ <= parent2.kind && parent2.kind <= 202 /* LastTypeNode */) {
                        return true;
                    }
                    switch (parent2.kind) {
                        case 230 /* ExpressionWithTypeArguments */:
                            return isHeritageClause(parent2.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(parent2);
                        case 165 /* TypeParameter */:
                            return node === parent2.constraint;
                        case 348 /* JSDocTemplateTag */:
                            return node === parent2.constraint;
                        case 169 /* PropertyDeclaration */:
                        case 168 /* PropertySignature */:
                        case 166 /* Parameter */:
                        case 257 /* VariableDeclaration */:
                            return node === parent2.type;
                        case 259 /* FunctionDeclaration */:
                        case 215 /* FunctionExpression */:
                        case 216 /* ArrowFunction */:
                        case 173 /* Constructor */:
                        case 171 /* MethodDeclaration */:
                        case 170 /* MethodSignature */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            return node === parent2.type;
                        case 176 /* CallSignature */:
                        case 177 /* ConstructSignature */:
                        case 178 /* IndexSignature */:
                            return node === parent2.type;
                        case 213 /* TypeAssertionExpression */:
                            return node === parent2.type;
                        case 210 /* CallExpression */:
                        case 211 /* NewExpression */:
                            return contains(parent2.typeArguments, node);
                        case 212 /* TaggedTemplateExpression */:
                            return false;
                    }
                }
            }
            return false;
        }