function createTemplateHead(text, rawText, templateFlags) {
                text = checkTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
                return createTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
            }