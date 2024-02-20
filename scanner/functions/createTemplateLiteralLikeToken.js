function createTemplateLiteralLikeToken(kind, text, rawText, templateFlags) {
                const node = createBaseToken(kind);
                node.text = text;
                node.rawText = rawText;
                node.templateFlags = templateFlags & 2048 /* TemplateLiteralLikeFlags */;
                node.transformFlags = getTransformFlagsOfTemplateLiteralLike(node.templateFlags);
                return node;
            }