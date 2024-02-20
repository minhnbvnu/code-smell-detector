function getInfo2(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            if (isIdentifier(token)) {
                const propertySignature = cast(token.parent.parent, isPropertySignature);
                const propertyName = token.getText(sourceFile);
                return {
                    container: cast(propertySignature.parent, isTypeLiteralNode),
                    typeNode: propertySignature.type,
                    constraint: propertyName,
                    name: propertyName === "K" ? "P" : "K"
                };
            }
            return void 0;
        }