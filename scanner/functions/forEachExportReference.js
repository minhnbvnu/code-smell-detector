function forEachExportReference(sourceFile, cb) {
            sourceFile.forEachChild(function recur(node) {
                if (isPropertyAccessExpression(node) && isExportsOrModuleExportsOrAlias(sourceFile, node.expression) && isIdentifier(node.name)) {
                    const { parent: parent2 } = node;
                    cb(node, isBinaryExpression(parent2) && parent2.left === node && parent2.operatorToken.kind === 63 /* EqualsToken */);
                }
                node.forEachChild(recur);
            });
        }