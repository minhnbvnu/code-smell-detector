function createObjectGetOwnPropertyDescriptorCall(target, propertyName) {
                return createGlobalMethodCall("Object", "getOwnPropertyDescriptor", [target, asExpression(propertyName)]);
            }