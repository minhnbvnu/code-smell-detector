function getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile) {
            const argumentCount = isNoSubstitutionTemplateLiteral(tagExpression.template) ? 1 : tagExpression.template.templateSpans.length + 1;
            if (argumentIndex !== 0) {
                Debug.assertLessThan(argumentIndex, argumentCount);
            }
            return {
                isTypeParameterList: false,
                invocation: { kind: 0 /* Call */, node: tagExpression },
                argumentsSpan: getApplicableSpanForTaggedTemplate(tagExpression, sourceFile),
                argumentIndex,
                argumentCount
            };
        }