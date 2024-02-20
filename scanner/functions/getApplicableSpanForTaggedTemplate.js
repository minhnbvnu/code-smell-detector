function getApplicableSpanForTaggedTemplate(taggedTemplate, sourceFile) {
            const template = taggedTemplate.template;
            const applicableSpanStart = template.getStart();
            let applicableSpanEnd = template.getEnd();
            if (template.kind === 225 /* TemplateExpression */) {
                const lastSpan = last(template.templateSpans);
                if (lastSpan.literal.getFullWidth() === 0) {
                    applicableSpanEnd = skipTrivia(sourceFile.text, applicableSpanEnd, 
                    /*stopAfterLineBreak*/
                    false);
                }
            }
            return createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
        }