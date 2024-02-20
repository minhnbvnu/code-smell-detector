function bindModuleExportsAssignment(node) {
                if (!setCommonJsModuleIndicator(node)) {
                    return;
                }
                const assignedExpression = getRightMostAssignedExpression(node.right);
                if (isEmptyObjectLiteral(assignedExpression) || container === file && isExportsOrModuleExportsOrAlias(file, assignedExpression)) {
                    return;
                }
                if (isObjectLiteralExpression(assignedExpression) && every(assignedExpression.properties, isShorthandPropertyAssignment)) {
                    forEach(assignedExpression.properties, bindExportAssignedObjectMemberAlias);
                    return;
                }
                const flags = exportAssignmentIsAlias(node) ? 2097152 /* Alias */ : 4 /* Property */ | 1048576 /* ExportValue */ | 512 /* ValueModule */;
                const symbol = declareSymbol(file.symbol.exports, file.symbol, node, flags | 67108864 /* Assignment */, 0 /* None */);
                setValueDeclaration(symbol, node);
            }