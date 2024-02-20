function processDescriptor(descriptor, isOwnProperty, possibleNativeBindingGetter)
        {
            // All properties.
            if (collectionMode & InjectedScript.CollectionMode.AllProperties) {
                descriptors.push(descriptor);
                return;
            }

            // Own properties.
            if (collectionMode & InjectedScript.CollectionMode.OwnProperties && isOwnProperty) {
                descriptors.push(descriptor);
                return;
            }

            // Native Getter properties.
            if (collectionMode & InjectedScript.CollectionMode.NativeGetterProperties) {
                if (possibleNativeBindingGetter) {
                    descriptors.push(descriptor);
                    return;
                }
            }
        }