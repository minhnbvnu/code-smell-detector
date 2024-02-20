function isStrictPascalCase(name) {
        return (name.length === 0 ||
            (name[0] === name[0].toUpperCase() && hasStrictCamelHumps(name, true)));
    }