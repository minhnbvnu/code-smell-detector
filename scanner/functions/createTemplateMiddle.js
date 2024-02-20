function createTemplateMiddle(text, rawText, templateFlags) {
                text = checkTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
                return createTemplateLiteralLikeNode(16 /* TemplateMiddle */, text, rawText, templateFlags);
            }