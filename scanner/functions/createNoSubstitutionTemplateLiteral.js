function createNoSubstitutionTemplateLiteral(text, rawText, templateFlags) {
                text = checkTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
                return createTemplateLiteralLikeDeclaration(14 /* NoSubstitutionTemplateLiteral */, text, rawText, templateFlags);
            }