function tryPrefixDeclaration(changes, errorCode, sourceFile, token) {
            if (errorCode === Diagnostics.Property_0_is_declared_but_its_value_is_never_read.code)
                return;
            if (token.kind === 138 /* InferKeyword */) {
                token = cast(token.parent, isInferTypeNode).typeParameter.name;
            }
            if (isIdentifier(token) && canPrefix(token)) {
                changes.replaceNode(sourceFile, token, factory.createIdentifier(`_${token.text}`));
                if (isParameter(token.parent)) {
                    getJSDocParameterTags(token.parent).forEach((tag) => {
                        if (isIdentifier(tag.name)) {
                            changes.replaceNode(sourceFile, tag.name, factory.createIdentifier(`_${tag.name.text}`));
                        }
                    });
                }
            }
        }