function getAllDecoratorsOfClass(node) {
            const decorators = getDecorators(node);
            const parameters = getDecoratorsOfParameters(getFirstConstructorWithBody(node));
            if (!some(decorators) && !some(parameters)) {
                return void 0;
            }
            return {
                decorators,
                parameters
            };
        }