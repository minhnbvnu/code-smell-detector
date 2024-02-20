function convertExportsDotXEquals_replaceNode(name, exported, useSitesToUnqualify) {
            const modifiers = [factory.createToken(93 /* ExportKeyword */)];
            switch (exported.kind) {
                case 215 /* FunctionExpression */: {
                    const { name: expressionName } = exported;
                    if (expressionName && expressionName.text !== name) {
                        return exportConst();
                    }
                }
                case 216 /* ArrowFunction */:
                    return functionExpressionToDeclaration(name, modifiers, exported, useSitesToUnqualify);
                case 228 /* ClassExpression */:
                    return classExpressionToDeclaration(name, modifiers, exported, useSitesToUnqualify);
                default:
                    return exportConst();
            }
            function exportConst() {
                return makeConst(modifiers, factory.createIdentifier(name), replaceImportUseSites(exported, useSitesToUnqualify));
            }
        }