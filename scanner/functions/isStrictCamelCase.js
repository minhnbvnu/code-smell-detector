function isStrictCamelCase(name) {
        return (name.length === 0 ||
            (name[0] === name[0].toLowerCase() && hasStrictCamelHumps(name, false)));
    }