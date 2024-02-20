function evaluateTemplateExpression(expr, location) {
                let result = expr.head.text;
                for (const span of expr.templateSpans) {
                    const value = evaluate(span.expression, location);
                    if (value === void 0) {
                        return void 0;
                    }
                    result += value;
                    result += span.literal.text;
                }
                return result;
            }