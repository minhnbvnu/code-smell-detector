function parseTypeAnnotation() {
                        return parseOptional(58 /* ColonToken */) ? parseType() : void 0;
                    }