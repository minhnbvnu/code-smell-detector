function isPascalCase(name) {
        return (name.length === 0 ||
            (name[0] === name[0].toUpperCase() && !name.includes('_')));
    }