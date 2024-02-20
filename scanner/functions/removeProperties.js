function removeProperties(node) {
            var properties = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                properties[_i - 1] = arguments[_i];
            }
            node.removeProperty.apply(node, __spreadArray([], __read(properties), false));
        }