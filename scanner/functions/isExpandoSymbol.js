function isExpandoSymbol(symbol) {
                if (symbol.flags & (16 /* Function */ | 32 /* Class */ | 1024 /* NamespaceModule */)) {
                    return true;
                }
                const node = symbol.valueDeclaration;
                if (node && isCallExpression(node)) {
                    return !!getAssignedExpandoInitializer(node);
                }
                let init = !node ? void 0 : isVariableDeclaration(node) ? node.initializer : isBinaryExpression(node) ? node.right : isPropertyAccessExpression(node) && isBinaryExpression(node.parent) ? node.parent.right : void 0;
                init = init && getRightMostAssignedExpression(init);
                if (init) {
                    const isPrototypeAssignment = isPrototypeAccess(isVariableDeclaration(node) ? node.name : isBinaryExpression(node) ? node.left : node);
                    return !!getExpandoInitializer(isBinaryExpression(init) && (init.operatorToken.kind === 56 /* BarBarToken */ || init.operatorToken.kind === 60 /* QuestionQuestionToken */) ? init.right : init, isPrototypeAssignment);
                }
                return false;
            }