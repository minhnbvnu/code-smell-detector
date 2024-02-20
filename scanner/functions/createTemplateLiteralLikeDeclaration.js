function createTemplateLiteralLikeDeclaration(kind, text, rawText, templateFlags) {
                const node = createBaseDeclaration(kind);
                node.text = text;
                node.rawText = rawText;
                node.templateFlags = templateFlags & 2048 /* TemplateLiteralLikeFlags */;
                node.transformFlags = getTransformFlagsOfTemplateLiteralLike(node.templateFlags);
                return node;
            }