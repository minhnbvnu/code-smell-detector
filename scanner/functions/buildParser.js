function buildParser(name, types, fn) {
        var parser = parserFactory(name, fn);
        types.forEach(function (type) {
            parsers[type] = parser;
        });
    }