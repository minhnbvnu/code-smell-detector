function getFunctionOrClassName(node) {
            const { parent: parent2 } = node;
            if (node.name && getFullWidth(node.name) > 0) {
                return cleanText(declarationNameToString(node.name));
            }
            else if (isVariableDeclaration(parent2)) {
                return cleanText(declarationNameToString(parent2.name));
            }
            else if (isBinaryExpression(parent2) && parent2.operatorToken.kind === 63 /* EqualsToken */) {
                return nodeText(parent2.left).replace(whiteSpaceRegex, "");
            }
            else if (isPropertyAssignment(parent2)) {
                return nodeText(parent2.name);
            }
            else if (getSyntacticModifierFlags(node) & 1024 /* Default */) {
                return "default";
            }
            else if (isClassLike(node)) {
                return "<class>";
            }
            else if (isCallExpression(parent2)) {
                let name = getCalledExpressionName(parent2.expression);
                if (name !== void 0) {
                    name = cleanText(name);
                    if (name.length > maxLength) {
                        return `${name} callback`;
                    }
                    const args = cleanText(mapDefined(parent2.arguments, (a) => isStringLiteralLike(a) ? a.getText(curSourceFile) : void 0).join(", "));
                    return `${name}(${args}) callback`;
                }
            }
            return "<function>";
        }