function tryParseTypeArguments() {
                        return token() === 29 /* LessThanToken */ ? parseBracketedList(20 /* TypeArguments */, parseType, 29 /* LessThanToken */, 31 /* GreaterThanToken */) : void 0;
                    }