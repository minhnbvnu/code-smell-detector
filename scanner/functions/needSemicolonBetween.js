function needSemicolonBetween(a, b) {
            return (isPropertySignature(a) || isPropertyDeclaration(a)) && isClassOrTypeElement(b) && b.name.kind === 164 /* ComputedPropertyName */ || isStatementButNotDeclaration(a) && isStatementButNotDeclaration(b);
        }