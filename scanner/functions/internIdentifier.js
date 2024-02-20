function internIdentifier(text) {
                        let identifier = identifiers.get(text);
                        if (identifier === void 0) {
                            identifiers.set(text, identifier = text);
                        }
                        return identifier;
                    }