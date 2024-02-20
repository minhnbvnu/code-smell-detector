function getFakeRestorer(object, property) {
        var descriptor = getPropertyDescriptor(object, property);

        function restorer() {
            if (descriptor.isOwn) {
                Object.defineProperty(object, property, descriptor);
            } else {
                delete object[property];
            }
        }
        restorer.object = object;
        restorer.property = property;
        return restorer;
    }