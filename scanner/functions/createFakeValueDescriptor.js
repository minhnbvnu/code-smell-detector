function createFakeValueDescriptor(name, symbol, descriptor, isOwnProperty, possibleNativeBindingGetter)
        {
            try {
                var descriptor = {name, value: object[name], writable: descriptor.writable || false, configurable: descriptor.configurable || false, enumerable: descriptor.enumerable || false};
                if (possibleNativeBindingGetter)
                    descriptor.nativeGetter = true;
                if (isOwnProperty)
                    descriptor.isOwn = true;
                if (symbol)
                    descriptor.symbol = symbol;
                // Silence any possible unhandledrejection exceptions created from accessing a native accessor with a wrong this object.
                if (descriptor.value instanceof Promise)
                    descriptor.value.catch(function(){});
                return descriptor;
            } catch (e) {
                var errorDescriptor = {name, value: e, wasThrown: true};
                if (isOwnProperty)
                    errorDescriptor.isOwn = true;
                if (symbol)
                    errorDescriptor.symbol = symbol;
                return errorDescriptor;
            }
        }