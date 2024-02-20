function isInTemplateString(sourceFile, position) {
            const token = getTokenAtPosition(sourceFile, position);
            return isTemplateLiteralKind(token.kind) && position > token.getStart(sourceFile);
        }