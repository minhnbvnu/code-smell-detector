function isCamelCase(name) {
        return (name.length === 0 ||
            (name[0] === name[0].toLowerCase() && !name.includes('_')));
    }