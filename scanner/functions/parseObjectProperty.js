function parseObjectProperty() {
        var token, key, id, param, computed,
            marker = markerCreate(), returnType, typeParameters;

        token = lookahead;
        computed = (token.value === '[' && token.type === Token.Punctuator);

        if (token.type === Token.Identifier || computed || matchAsync()) {
            id = parseObjectPropertyKey();

            if (match(':')) {
                lex();

                return markerApply(
                    marker,
                    delegate.createProperty(
                        'init',
                        id,
                        parseAssignmentExpression(),
                        false,
                        false,
                        computed
                    )
                );
            }

            if (match('(') || match('<')) {
                if (match('<')) {
                    typeParameters = parseTypeParameterDeclaration();
                }
                return markerApply(
                    marker,
                    delegate.createProperty(
                        'init',
                        id,
                        parsePropertyMethodFunction({
                            generator: false,
                            async: false,
                            typeParameters: typeParameters
                        }),
                        true,
                        false,
                        computed
                    )
                );
            }

            // Property Assignment: Getter and Setter.

            if (token.value === 'get') {
                computed = (lookahead.value === '[');
                key = parseObjectPropertyKey();

                expect('(');
                expect(')');
                if (match(':')) {
                    returnType = parseTypeAnnotation();
                }

                return markerApply(
                    marker,
                    delegate.createProperty(
                        'get',
                        key,
                        parsePropertyFunction({
                            generator: false,
                            async: false,
                            returnType: returnType
                        }),
                        false,
                        false,
                        computed
                    )
                );
            }

            if (token.value === 'set') {
                computed = (lookahead.value === '[');
                key = parseObjectPropertyKey();

                expect('(');
                token = lookahead;
                param = [ parseTypeAnnotatableIdentifier() ];
                expect(')');
                if (match(':')) {
                    returnType = parseTypeAnnotation();
                }

                return markerApply(
                    marker,
                    delegate.createProperty(
                        'set',
                        key,
                        parsePropertyFunction({
                            params: param,
                            generator: false,
                            async: false,
                            name: token,
                            returnType: returnType
                        }),
                        false,
                        false,
                        computed
                    )
                );
            }

            if (token.value === 'async') {
                computed = (lookahead.value === '[');
                key = parseObjectPropertyKey();

                if (match('<')) {
                    typeParameters = parseTypeParameterDeclaration();
                }

                return markerApply(
                    marker,
                    delegate.createProperty(
                        'init',
                        key,
                        parsePropertyMethodFunction({
                            generator: false,
                            async: true,
                            typeParameters: typeParameters
                        }),
                        true,
                        false,
                        computed
                    )
                );
            }

            if (computed) {
                // Computed properties can only be used with full notation.
                throwUnexpected(lookahead);
            }

            return markerApply(
                marker,
                delegate.createProperty('init', id, id, false, true, false)
            );
        }

        if (token.type === Token.EOF || token.type === Token.Punctuator) {
            if (!match('*')) {
                throwUnexpected(token);
            }
            lex();

            computed = (lookahead.type === Token.Punctuator && lookahead.value === '[');

            id = parseObjectPropertyKey();

            if (match('<')) {
                typeParameters = parseTypeParameterDeclaration();
            }

            if (!match('(')) {
                throwUnexpected(lex());
            }

            return markerApply(marker, delegate.createProperty(
                'init',
                id,
                parsePropertyMethodFunction({
                    generator: true,
                    typeParameters: typeParameters
                }),
                true,
                false,
                computed
            ));
        }
        key = parseObjectPropertyKey();
        if (match(':')) {
            lex();
            return markerApply(marker, delegate.createProperty('init', key, parseAssignmentExpression(), false, false, false));
        }
        if (match('(') || match('<')) {
            if (match('<')) {
                typeParameters = parseTypeParameterDeclaration();
            }
            return markerApply(marker, delegate.createProperty(
                'init',
                key,
                parsePropertyMethodFunction({
                    generator: false,
                    typeParameters: typeParameters
                }),
                true,
                false,
                false
            ));
        }
        throwUnexpected(lex());
    }