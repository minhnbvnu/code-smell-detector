function getPropertyOfType(type, name) {
        if (!name.startsWith('__'))
            return type.getProperty(name);
        return type.getProperties().find((s) => s.escapedName === name);
    }