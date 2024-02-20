function isExportsOrModuleExportsOrAlias(sourceFile, node) {
            let i = 0;
            const q = createQueue();
            q.enqueue(node);
            while (!q.isEmpty() && i < 100) {
                i++;
                node = q.dequeue();
                if (isExportsIdentifier(node) || isModuleExportsAccessExpression(node)) {
                    return true;
                }
                else if (isIdentifier(node)) {
                    const symbol = lookupSymbolForName(sourceFile, node.escapedText);
                    if (!!symbol && !!symbol.valueDeclaration && isVariableDeclaration(symbol.valueDeclaration) && !!symbol.valueDeclaration.initializer) {
                        const init = symbol.valueDeclaration.initializer;
                        q.enqueue(init);
                        if (isAssignmentExpression(init, 
                        /*excludeCompoundAssignment*/
                        true)) {
                            q.enqueue(init.left);
                            q.enqueue(init.right);
                        }
                    }
                }
            }
            return false;
        }