function mayReturnNever(func) {
                switch (func.kind) {
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        return true;
                    case 171 /* MethodDeclaration */:
                        return func.parent.kind === 207 /* ObjectLiteralExpression */;
                    default:
                        return false;
                }
            }