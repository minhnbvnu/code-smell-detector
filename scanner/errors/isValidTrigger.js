function isValidTrigger(sourceFile, triggerCharacter, contextToken, position) {
            switch (triggerCharacter) {
                case ".":
                case "@":
                    return true;
                case '"':
                case "'":
                case "`":
                    return !!contextToken && isStringLiteralOrTemplate(contextToken) && position === contextToken.getStart(sourceFile) + 1;
                case "#":
                    return !!contextToken && isPrivateIdentifier(contextToken) && !!getContainingClass(contextToken);
                case "<":
                    return !!contextToken && contextToken.kind === 29 /* LessThanToken */ && (!isBinaryExpression(contextToken.parent) || binaryExpressionMayBeOpenTag(contextToken.parent));
                case "/":
                    return !!contextToken && (isStringLiteralLike(contextToken) ? !!tryGetImportFromModuleSpecifier(contextToken) : contextToken.kind === 43 /* SlashToken */ && isJsxClosingElement(contextToken.parent));
                case " ":
                    return !!contextToken && isImportKeyword(contextToken) && contextToken.parent.kind === 308 /* SourceFile */;
                default:
                    return Debug.assertNever(triggerCharacter);
            }
        }