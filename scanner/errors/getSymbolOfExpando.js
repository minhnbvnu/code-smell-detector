function getSymbolOfExpando(node, allowDeclaration) {
                if (!node.parent) {
                    return void 0;
                }
                let name;
                let decl;
                if (isVariableDeclaration(node.parent) && node.parent.initializer === node) {
                    if (!isInJSFile(node) && !(isVarConst(node.parent) && isFunctionLikeDeclaration(node))) {
                        return void 0;
                    }
                    name = node.parent.name;
                    decl = node.parent;
                }
                else if (isBinaryExpression(node.parent)) {
                    const parentNode = node.parent;
                    const parentNodeOperator = node.parent.operatorToken.kind;
                    if (parentNodeOperator === 63 /* EqualsToken */ && (allowDeclaration || parentNode.right === node)) {
                        name = parentNode.left;
                        decl = name;
                    }
                    else if (parentNodeOperator === 56 /* BarBarToken */ || parentNodeOperator === 60 /* QuestionQuestionToken */) {
                        if (isVariableDeclaration(parentNode.parent) && parentNode.parent.initializer === parentNode) {
                            name = parentNode.parent.name;
                            decl = parentNode.parent;
                        }
                        else if (isBinaryExpression(parentNode.parent) && parentNode.parent.operatorToken.kind === 63 /* EqualsToken */ && (allowDeclaration || parentNode.parent.right === parentNode)) {
                            name = parentNode.parent.left;
                            decl = name;
                        }
                        if (!name || !isBindableStaticNameExpression(name) || !isSameEntityName(name, parentNode.left)) {
                            return void 0;
                        }
                    }
                }
                else if (allowDeclaration && isFunctionDeclaration(node)) {
                    name = node.name;
                    decl = node;
                }
                if (!decl || !name || !allowDeclaration && !getExpandoInitializer(node, isPrototypeAccess(name))) {
                    return void 0;
                }
                return getSymbolOfNode(decl);
            }