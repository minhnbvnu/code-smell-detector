function walkAccessExpression(access) {
                if (access.kind === 208 /* PropertyAccessExpression */) {
                    const res = action(access.name);
                    if (res !== void 0) {
                        return res;
                    }
                }
                else if (access.kind === 209 /* ElementAccessExpression */) {
                    if (isIdentifier(access.argumentExpression) || isStringLiteralLike(access.argumentExpression)) {
                        const res = action(access.argumentExpression);
                        if (res !== void 0) {
                            return res;
                        }
                    }
                    else {
                        return void 0;
                    }
                }
                if (isAccessExpression(access.expression)) {
                    return walkAccessExpression(access.expression);
                }
                if (isIdentifier(access.expression)) {
                    return action(access.expression);
                }
                return void 0;
            }