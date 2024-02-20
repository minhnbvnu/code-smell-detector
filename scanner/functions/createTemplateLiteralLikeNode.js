function createTemplateLiteralLikeNode(kind, text, rawText, templateFlags) {
                if (kind === 14 /* NoSubstitutionTemplateLiteral */) {
                    return createTemplateLiteralLikeDeclaration(kind, text, rawText, templateFlags);
                }
                return createTemplateLiteralLikeToken(kind, text, rawText, templateFlags);
            }