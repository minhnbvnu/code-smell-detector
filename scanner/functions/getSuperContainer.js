function getSuperContainer(node, stopOnFunctions) {
            while (true) {
                node = node.parent;
                if (!node) {
                    return void 0;
                }
                switch (node.kind) {
                    case 164 /* ComputedPropertyName */:
                        node = node.parent;
                        break;
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        if (!stopOnFunctions) {
                            continue;
                        }
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 173 /* Constructor */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 172 /* ClassStaticBlockDeclaration */:
                        return node;
                    case 167 /* Decorator */:
                        if (node.parent.kind === 166 /* Parameter */ && isClassElement(node.parent.parent)) {
                            node = node.parent.parent;
                        }
                        else if (isClassElement(node.parent)) {
                            node = node.parent;
                        }
                        break;
                }
            }
        }