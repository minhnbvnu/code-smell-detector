function isSnakeCase(name) {
        return (name.length === 0 ||
            (name === name.toLowerCase() && validateUnderscores(name)));
    }