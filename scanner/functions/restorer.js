function restorer() {
            if (descriptor.isOwn) {
                Object.defineProperty(object, property, descriptor);
            } else {
                delete object[property];
            }
        }