function parseTypeArgumentsOfTypeReference() {
                        if (!scanner2.hasPrecedingLineBreak() && reScanLessThanToken() === 29 /* LessThanToken */) {
                            return parseBracketedList(20 /* TypeArguments */, parseType, 29 /* LessThanToken */, 31 /* GreaterThanToken */);
                        }
                    }