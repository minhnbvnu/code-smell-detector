function getExpandoInitializer(initializer, isPrototypeAssignment) {
            if (isCallExpression(initializer)) {
                const e = skipParentheses(initializer.expression);
                return e.kind === 215 /* FunctionExpression */ || e.kind === 216 /* ArrowFunction */ ? initializer : void 0;
            }
            if (initializer.kind === 215 /* FunctionExpression */ || initializer.kind === 228 /* ClassExpression */ || initializer.kind === 216 /* ArrowFunction */) {
                return initializer;
            }
            if (isObjectLiteralExpression(initializer) && (initializer.properties.length === 0 || isPrototypeAssignment)) {
                return initializer;
            }
        }