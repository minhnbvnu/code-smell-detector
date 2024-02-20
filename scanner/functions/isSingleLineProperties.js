function isSingleLineProperties(properties) {
        const [firstProp] = properties, lastProp = last(properties);
        return firstProp.loc.start.line === lastProp.loc.end.line;
    }