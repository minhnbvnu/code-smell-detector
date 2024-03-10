function getContextNodeForNodeEntry(node) {
            if (isDeclaration(node)) {
                return getContextNode(node);
            }
            if (!node.parent)
                return void 0;
            if (!isDeclaration(node.parent) && !isExportAssignment(node.parent)) {
                if (isInJSFile(node)) {
                    const binaryExpression = isBinaryExpression(node.parent) ? node.parent : isAccessExpression(node.parent) && isBinaryExpression(node.parent.parent) && node.parent.parent.left === node.parent ? node.parent.parent : void 0;
                    if (binaryExpression && getAssignmentDeclarationKind(binaryExpression) !== 0 /* None */) {
                        return getContextNode(binaryExpression);
                    }
                }
                if (isJsxOpeningElement(node.parent) || isJsxClosingElement(node.parent)) {
                    return node.parent.parent;
                }
                else if (isJsxSelfClosingElement(node.parent) || isLabeledStatement(node.parent) || isBreakOrContinueStatement(node.parent)) {
                    return node.parent;
                }
                else if (isStringLiteralLike(node)) {
                    const validImport = tryGetImportFromModuleSpecifier(node);
                    if (validImport) {
                        const declOrStatement = findAncestor(validImport, (node2) => isDeclaration(node2) || isStatement(node2) || isJSDocTag(node2));
                        return isDeclaration(declOrStatement) ? getContextNode(declOrStatement) : declOrStatement;
                    }
                }
                const propertyName = findAncestor(node, isComputedPropertyName);
                return propertyName ? getContextNode(propertyName.parent) : void 0;
            }
            if (node.parent.name === node || // node is name of declaration, use parent
                isConstructorDeclaration(node.parent) || isExportAssignment(node.parent) || // Property name of the import export specifier or binding pattern, use parent
                (isImportOrExportSpecifier(node.parent) || isBindingElement(node.parent)) && node.parent.propertyName === node || // Is default export
                node.kind === 88 /* DefaultKeyword */ && hasSyntacticModifier(node.parent, 1025 /* ExportDefault */)) {
                return getContextNode(node.parent);
            }
            return void 0;
        }