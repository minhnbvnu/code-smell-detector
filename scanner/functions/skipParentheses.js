function skipParentheses(node, excludeJSDocTypeAssertions) {
            const flags = excludeJSDocTypeAssertions ? 1 /* Parentheses */ | 16 /* ExcludeJSDocTypeAssertion */ : 1 /* Parentheses */;
            return skipOuterExpressions(node, flags);
        }