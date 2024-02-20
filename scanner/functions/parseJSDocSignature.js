function parseJSDocSignature(start2, indent2) {
                                const parameters = parseCallbackTagParameters(indent2);
                                const returnTag = tryParse(() => {
                                    if (parseOptionalJsdoc(59 /* AtToken */)) {
                                        const tag = parseTag(indent2);
                                        if (tag && tag.kind === 345 /* JSDocReturnTag */) {
                                            return tag;
                                        }
                                    }
                                });
                                return finishNode(factory2.createJSDocSignature(
                                /*typeParameters*/
                                void 0, parameters, returnTag), start2);
                            }