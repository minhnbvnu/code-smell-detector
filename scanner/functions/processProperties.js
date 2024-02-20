function processProperties(o, properties, isOwnProperty)
        {
            for (var i = 0; i < properties.length; ++i) {
                var property = properties[i];
                if (nameProcessed.has(property) || property === "__proto__")
                    continue;

                nameProcessed.add(property);

                var name = toString(property);
                var symbol = isSymbol(property) ? property : null;

                var descriptor = Object.getOwnPropertyDescriptor(o, property);
                if (!descriptor) {
                    // FIXME: Bad descriptor. Can we get here?
                    // Fall back to very restrictive settings.
                    var fakeDescriptor = createFakeValueDescriptor(name, symbol, {writable: false, configurable: false, enumerable: false}, isOwnProperty);
                    processDescriptor(fakeDescriptor, isOwnProperty);
                    continue;
                }

                if (nativeGettersAsValues) {
                    if (String(descriptor.get).endsWith("[native code]\n}") || (!descriptor.get && descriptor.hasOwnProperty("get") && !descriptor.set && descriptor.hasOwnProperty("set"))) {
                        // Developers may create such a descriptor, so we should be resilient:
                        // var x = {}; Object.defineProperty(x, "p", {get:undefined}); Object.getOwnPropertyDescriptor(x, "p")
                        var fakeDescriptor = createFakeValueDescriptor(name, symbol, descriptor, isOwnProperty, true);
                        processDescriptor(fakeDescriptor, isOwnProperty, true);
                        continue;
                    }
                }

                descriptor.name = name;
                if (isOwnProperty)
                    descriptor.isOwn = true;
                if (symbol)
                    descriptor.symbol = symbol;
                processDescriptor(descriptor, isOwnProperty);
            }
        }