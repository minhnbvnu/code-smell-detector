function parse_css_length(size) {
        const match = size.match(/^\s*(-?\d+(\.\d+)?)(\w+)\s*$/);
        if (match != null) {
            const [, value, , unit] = match;
            const number = Number(value);
            if (isFinite(number))
                return { value: number, unit };
        }
        return null;
    }