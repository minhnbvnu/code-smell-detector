function getSourceTarget(errorNode, checker) {
            var _a2;
            if (!errorNode) {
                return void 0;
            }
            else if (isBinaryExpression(errorNode.parent) && errorNode.parent.operatorToken.kind === 63 /* EqualsToken */) {
                return { source: errorNode.parent.right, target: errorNode.parent.left };
            }
            else if (isVariableDeclaration(errorNode.parent) && errorNode.parent.initializer) {
                return { source: errorNode.parent.initializer, target: errorNode.parent.name };
            }
            else if (isCallExpression(errorNode.parent)) {
                const n = checker.getSymbolAtLocation(errorNode.parent.expression);
                if (!(n == null ? void 0 : n.valueDeclaration) || !isFunctionLikeKind(n.valueDeclaration.kind))
                    return void 0;
                if (!isExpression(errorNode))
                    return void 0;
                const i = errorNode.parent.arguments.indexOf(errorNode);
                if (i === -1)
                    return void 0;
                const name = n.valueDeclaration.parameters[i].name;
                if (isIdentifier(name))
                    return { source: errorNode, target: name };
            }
            else if (isPropertyAssignment(errorNode.parent) && isIdentifier(errorNode.parent.name) || isShorthandPropertyAssignment(errorNode.parent)) {
                const parentTarget = getSourceTarget(errorNode.parent.parent, checker);
                if (!parentTarget)
                    return void 0;
                const prop = checker.getPropertyOfType(checker.getTypeAtLocation(parentTarget.target), errorNode.parent.name.text);
                const declaration = (_a2 = prop == null ? void 0 : prop.declarations) == null ? void 0 : _a2[0];
                if (!declaration)
                    return void 0;
                return {
                    source: isPropertyAssignment(errorNode.parent) ? errorNode.parent.initializer : errorNode.parent.name,
                    target: declaration
                };
            }
            return void 0;
        }