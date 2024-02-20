function isThisParameter(parameter) {
        return parameter.name.kind === ts.SyntaxKind.Identifier && parameter.name.originalKeywordKind === ts.SyntaxKind.ThisKeyword;
    }