function parseObjectType(allowStatic) {
        var callProperties = [], indexers = [], marker, optional = false,
            properties = [], propertyKey, propertyTypeAnnotation,
            token, isStatic, matchStatic;

        expect('{');

        while (!match('}')) {
            marker = markerCreate();
            matchStatic =
                   strict
                   ? matchKeyword('static')
                   : matchContextualKeyword('static');

            if (allowStatic && matchStatic) {
                token = lex();
                isStatic = true;
            }

            if (match('[')) {
                indexers.push(parseObjectTypeIndexer(marker, isStatic));
            } else if (match('(') || match('<')) {
                callProperties.push(parseObjectTypeCallProperty(marker, allowStatic));
            } else {
                if (isStatic && match(':')) {
                    propertyKey = markerApply(marker, delegate.createIdentifier(token));
                    throwErrorTolerant(token, Messages.StrictReservedWord);
                } else {
                    propertyKey = parseObjectPropertyKey();
                }
                if (match('<') || match('(')) {
                    // This is a method property
                    properties.push(parseObjectTypeMethod(marker, isStatic, propertyKey));
                } else {
                    if (match('?')) {
                        lex();
                        optional = true;
                    }
                    expect(':');
                    propertyTypeAnnotation = parseType();
                    properties.push(markerApply(marker, delegate.createObjectTypeProperty(
                        propertyKey,
                        propertyTypeAnnotation,
                        optional,
                        isStatic
                    )));
                }
            }

            if (match(';')) {
                lex();
            } else if (!match('}')) {
                throwUnexpected(lookahead);
            }
        }

        expect('}');

        return delegate.createObjectTypeAnnotation(
            properties,
            indexers,
            callProperties
        );
    }