function getInfo13(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            if (isIdentifier(token) && isPropertyDeclaration(token.parent)) {
                const type = getEffectiveTypeAnnotationNode(token.parent);
                if (type) {
                    return { type, prop: token.parent, isJs: isInJSFile(token.parent) };
                }
            }
            return void 0;
        }