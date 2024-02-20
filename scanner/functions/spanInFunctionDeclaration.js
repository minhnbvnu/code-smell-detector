function spanInFunctionDeclaration(functionDeclaration) {
                    if (!functionDeclaration.body) {
                        return void 0;
                    }
                    if (canFunctionHaveSpanInWholeDeclaration(functionDeclaration)) {
                        return textSpan(functionDeclaration);
                    }
                    return spanInNode(functionDeclaration.body);
                }