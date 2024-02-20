function parseNadgridString(value) {
        if (value.length === 0) {
            return null;
        }
        var optional = value[0] === '@';
        if (optional) {
            value = value.slice(1);
        }
        if (value === 'null') {
            return { name: 'null', mandatory: !optional, grid: null, isNull: true };
        }
        return {
            name: value,
            mandatory: !optional,
            grid: loadedNadgrids[value] || null,
            isNull: false
        };
    }