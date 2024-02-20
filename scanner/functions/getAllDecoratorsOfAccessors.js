function getAllDecoratorsOfAccessors(accessor, parent2) {
            if (!accessor.body) {
                return void 0;
            }
            const { firstAccessor, secondAccessor, getAccessor, setAccessor } = getAllAccessorDeclarations(parent2.members, accessor);
            const firstAccessorWithDecorators = hasDecorators(firstAccessor) ? firstAccessor : secondAccessor && hasDecorators(secondAccessor) ? secondAccessor : void 0;
            if (!firstAccessorWithDecorators || accessor !== firstAccessorWithDecorators) {
                return void 0;
            }
            const decorators = getDecorators(firstAccessorWithDecorators);
            const parameters = getDecoratorsOfParameters(setAccessor);
            if (!some(decorators) && !some(parameters)) {
                return void 0;
            }
            return {
                decorators,
                parameters,
                getDecorators: getAccessor && getDecorators(getAccessor),
                setDecorators: setAccessor && getDecorators(setAccessor)
            };
        }