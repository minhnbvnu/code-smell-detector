function transformAllDecoratorsOfDeclaration(allDecorators) {
                if (!allDecorators) {
                    return void 0;
                }
                const decoratorExpressions = [];
                addRange(decoratorExpressions, map(allDecorators.decorators, transformDecorator));
                return decoratorExpressions;
            }