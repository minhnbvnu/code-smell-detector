function tryGetObjectTypeDeclarationCompletionContainer(sourceFile, contextToken, location, position) {
            var _a2;
            switch (location.kind) {
                case 354 /* SyntaxList */:
                    return tryCast(location.parent, isObjectTypeDeclaration);
                case 1 /* EndOfFileToken */:
                    const cls = tryCast(lastOrUndefined(cast(location.parent, isSourceFile).statements), isObjectTypeDeclaration);
                    if (cls && !findChildOfKind(cls, 19 /* CloseBraceToken */, sourceFile)) {
                        return cls;
                    }
                    break;
                case 79 /* Identifier */: {
                    const originalKeywordKind = identifierToKeywordKind(location);
                    if (originalKeywordKind) {
                        return void 0;
                    }
                    if (isPropertyDeclaration(location.parent) && location.parent.initializer === location) {
                        return void 0;
                    }
                    if (isFromObjectTypeDeclaration(location)) {
                        return findAncestor(location, isObjectTypeDeclaration);
                    }
                }
            }
            if (!contextToken)
                return void 0;
            if (location.kind === 135 /* ConstructorKeyword */ || isIdentifier(contextToken) && isPropertyDeclaration(contextToken.parent) && isClassLike(location)) {
                return findAncestor(contextToken, isClassLike);
            }
            switch (contextToken.kind) {
                case 63 /* EqualsToken */:
                    return void 0;
                case 26 /* SemicolonToken */:
                case 19 /* CloseBraceToken */:
                    return isFromObjectTypeDeclaration(location) && location.parent.name === location ? location.parent.parent : tryCast(location, isObjectTypeDeclaration);
                case 18 /* OpenBraceToken */:
                case 27 /* CommaToken */:
                    return tryCast(contextToken.parent, isObjectTypeDeclaration);
                default:
                    if (isObjectTypeDeclaration(location)) {
                        if (getLineAndCharacterOfPosition(sourceFile, contextToken.getEnd()).line !== getLineAndCharacterOfPosition(sourceFile, position).line) {
                            return location;
                        }
                        const isValidKeyword = isClassLike(contextToken.parent.parent) ? isClassMemberCompletionKeyword : isInterfaceOrTypeLiteralCompletionKeyword;
                        return isValidKeyword(contextToken.kind) || contextToken.kind === 41 /* AsteriskToken */ || isIdentifier(contextToken) && isValidKeyword((_a2 = identifierToKeywordKind(contextToken)) != null ? _a2 : 0 /* Unknown */) ? contextToken.parent.parent : void 0;
                    }
                    return void 0;
            }
        }