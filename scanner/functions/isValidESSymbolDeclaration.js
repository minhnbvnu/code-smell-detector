function isValidESSymbolDeclaration(node) {
            return (isVariableDeclaration(node) ? isVarConst(node) && isIdentifier(node.name) && isVariableDeclarationInVariableStatement(node) : isPropertyDeclaration(node) ? hasEffectiveReadonlyModifier(node) && hasStaticModifier(node) : isPropertySignature(node) && hasEffectiveReadonlyModifier(node)) || isCommonJsExportPropertyAssignment(node);
        }