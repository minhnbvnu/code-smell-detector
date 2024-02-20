function reportObviousDecoratorErrors(node) {
                const decorator = findFirstIllegalDecorator(node);
                return decorator && grammarErrorOnFirstToken(decorator, Diagnostics.Decorators_are_not_valid_here);
            }