function hasInvalidEscape(template) {
            return template && !!(isNoSubstitutionTemplateLiteral(template) ? template.templateFlags : template.head.templateFlags || some(template.templateSpans, (span) => !!span.literal.templateFlags));
        }