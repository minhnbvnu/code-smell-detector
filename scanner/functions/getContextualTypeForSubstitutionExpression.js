function getContextualTypeForSubstitutionExpression(template, substitutionExpression) {
                if (template.parent.kind === 212 /* TaggedTemplateExpression */) {
                    return getContextualTypeForArgument(template.parent, substitutionExpression);
                }
                return void 0;
            }