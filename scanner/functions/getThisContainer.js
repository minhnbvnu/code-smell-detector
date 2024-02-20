function getThisContainer(node, includeArrowFunctions, includeClassComputedPropertyName) {
            Debug.assert(node.kind !== 308 /* SourceFile */);
            while (true) {
                node = node.parent;
                if (!node) {
                    return Debug.fail();
                }
                switch (node.kind) {
                    case 164 /* ComputedPropertyName */:
                        if (includeClassComputedPropertyName && isClassLike(node.parent.parent)) {
                            return node;
                        }
                        node = node.parent.parent;
                        break;
                    case 167 /* Decorator */:
                        if (node.parent.kind === 166 /* Parameter */ && isClassElement(node.parent.parent)) {
                            node = node.parent.parent;
                        }
                        else if (isClassElement(node.parent)) {
                            node = node.parent;
                        }
                        break;
                    case 216 /* ArrowFunction */:
                        if (!includeArrowFunctions) {
                            continue;
                        }
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 264 /* ModuleDeclaration */:
                    case 172 /* ClassStaticBlockDeclaration */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 173 /* Constructor */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 176 /* CallSignature */:
                    case 177 /* ConstructSignature */:
                    case 178 /* IndexSignature */:
                    case 263 /* EnumDeclaration */:
                    case 308 /* SourceFile */:
                        return node;
                }
            }
        }