function parseNameOfParameter(modifiers) {
                        const name = parseIdentifierOrPattern(Diagnostics.Private_identifiers_cannot_be_used_as_parameters);
                        if (getFullWidth(name) === 0 && !some(modifiers) && isModifierKind(token())) {
                            nextToken();
                        }
                        return name;
                    }