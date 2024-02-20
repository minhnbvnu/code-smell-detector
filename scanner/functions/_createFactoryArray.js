function _createFactoryArray(constructorFn) {
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        var args = constructorFn.$inject || [];
        var factoryArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push((...args) => {
            //return new constructorFn(...args);
            var instance = new constructorFn(...args);
            for (var key in instance) {
                instance[key] = instance[key];
            }
            return instance;
        });

        return factoryArray;
    }