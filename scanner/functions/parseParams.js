function parseParams(firstRestricted) {
        var options, marker = markerCreate();

        options = {
            params: [],
            defaultCount: 0,
            defaults: [],
            rest: null,
            firstRestricted: firstRestricted
        };

        expect('(');

        if (!match(')')) {
            options.paramSet = new StringMap();
            while (index < length) {
                if (!parseParam(options)) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        if (options.defaultCount === 0) {
            options.defaults = [];
        }

        if (match(':')) {
            options.returnType = parseTypeAnnotation();
        }

        return markerApply(marker, options);
    }