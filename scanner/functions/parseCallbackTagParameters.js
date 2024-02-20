function parseCallbackTagParameters(indent2) {
                                const pos = getNodePos();
                                let child;
                                let parameters;
                                while (child = tryParse(() => parseChildParameterOrPropertyTag(4 /* CallbackParameter */, indent2))) {
                                    parameters = append(parameters, child);
                                }
                                return createNodeArray(parameters || [], pos);
                            }