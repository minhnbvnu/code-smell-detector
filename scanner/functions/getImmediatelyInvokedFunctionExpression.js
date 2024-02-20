function getImmediatelyInvokedFunctionExpression(func) {
            if (func.kind === 215 /* FunctionExpression */ || func.kind === 216 /* ArrowFunction */) {
                let prev = func;
                let parent2 = func.parent;
                while (parent2.kind === 214 /* ParenthesizedExpression */) {
                    prev = parent2;
                    parent2 = parent2.parent;
                }
                if (parent2.kind === 210 /* CallExpression */ && parent2.expression === prev) {
                    return parent2;
                }
            }
        }