function parseTemplateTagTypeParameters() {
                                const pos = getNodePos();
                                const typeParameters = [];
                                do {
                                    skipWhitespace();
                                    const node = parseTemplateTagTypeParameter();
                                    if (node !== void 0) {
                                        typeParameters.push(node);
                                    }
                                    skipWhitespaceOrAsterisk();
                                } while (parseOptionalJsdoc(27 /* CommaToken */));
                                return createNodeArray(typeParameters, pos);
                            }