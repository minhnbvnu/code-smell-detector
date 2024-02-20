function createObjectDefinePropertyCall(target, propertyName, attributes) {
                return createGlobalMethodCall("Object", "defineProperty", [target, asExpression(propertyName), attributes]);
            }