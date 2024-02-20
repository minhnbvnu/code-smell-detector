function makeValueAccessor(bindingKey) {
            return function () { return parsedBindings[bindingKey] }
        }