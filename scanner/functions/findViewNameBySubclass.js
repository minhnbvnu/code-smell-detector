function findViewNameBySubclass(viewSubclass, configs) {
        var superProto = Object.getPrototypeOf(viewSubclass.prototype);
        for (var viewType in configs) {
            var parsed = configs[viewType];
            // need DIRECT subclass, so instanceof won't do it
            if (parsed.class && parsed.class.prototype === superProto) {
                return viewType;
            }
        }
        return '';
    }