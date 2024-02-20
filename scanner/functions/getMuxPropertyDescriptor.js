function getMuxPropertyDescriptor(name) {
        var desc = getPropertyDescriptor(targetFor(name), name);
        if (desc)
            desc.configurable = true;
        return desc;
    }