function createTemplateTail(text, rawText, templateFlags) {
                text = checkTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
                return createTemplateLiteralLikeNode(17 /* TemplateTail */, text, rawText, templateFlags);
            }