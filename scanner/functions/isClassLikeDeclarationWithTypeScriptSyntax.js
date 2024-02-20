function isClassLikeDeclarationWithTypeScriptSyntax(node) {
                return hasDecorators(node) || some(node.typeParameters) || some(node.heritageClauses, hasTypeScriptClassSyntax) || some(node.members, hasTypeScriptClassSyntax);
            }