function getAllDecoratorsOfMethod(method) {
            if (!method.body) {
                return void 0;
            }
            const decorators = getDecorators(method);
            const parameters = getDecoratorsOfParameters(method);
            if (!some(decorators) && !some(parameters)) {
                return void 0;
            }
            return { decorators, parameters };
        }