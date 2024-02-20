function getAllDecoratorsOfProperty(property) {
            const decorators = getDecorators(property);
            if (!some(decorators)) {
                return void 0;
            }
            return { decorators };
        }