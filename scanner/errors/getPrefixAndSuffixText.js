function getPrefixAndSuffixText(entry, originalNode, checker) {
            if (entry.kind !== 0 /* Span */ && isIdentifier(originalNode)) {
                const { node, kind } = entry;
                const parent2 = node.parent;
                const name = originalNode.text;
                const isShorthandAssignment = isShorthandPropertyAssignment(parent2);
                if (isShorthandAssignment || isObjectBindingElementWithoutPropertyName(parent2) && parent2.name === node && parent2.dotDotDotToken === void 0) {
                    const prefixColon = { prefixText: name + ": " };
                    const suffixColon = { suffixText: ": " + name };
                    if (kind === 3 /* SearchedLocalFoundProperty */) {
                        return prefixColon;
                    }
                    if (kind === 4 /* SearchedPropertyFoundLocal */) {
                        return suffixColon;
                    }
                    if (isShorthandAssignment) {
                        const grandParent = parent2.parent;
                        if (isObjectLiteralExpression(grandParent) && isBinaryExpression(grandParent.parent) && isModuleExportsAccessExpression(grandParent.parent.left)) {
                            return prefixColon;
                        }
                        return suffixColon;
                    }
                    else {
                        return prefixColon;
                    }
                }
                else if (isImportSpecifier(parent2) && !parent2.propertyName) {
                    const originalSymbol = isExportSpecifier(originalNode.parent) ? checker.getExportSpecifierLocalTargetSymbol(originalNode.parent) : checker.getSymbolAtLocation(originalNode);
                    return contains(originalSymbol.declarations, parent2) ? { prefixText: name + " as " } : emptyOptions;
                }
                else if (isExportSpecifier(parent2) && !parent2.propertyName) {
                    return originalNode === entry.node || checker.getSymbolAtLocation(originalNode) === checker.getSymbolAtLocation(entry.node) ? { prefixText: name + " as " } : { suffixText: " as " + name };
                }
            }
            return emptyOptions;
        }