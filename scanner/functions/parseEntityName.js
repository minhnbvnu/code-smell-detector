function parseEntityName(allowReservedWords, diagnosticMessage) {
                        const pos = getNodePos();
                        let entity = allowReservedWords ? parseIdentifierName(diagnosticMessage) : parseIdentifier(diagnosticMessage);
                        while (parseOptional(24 /* DotToken */)) {
                            if (token() === 29 /* LessThanToken */) {
                                break;
                            }
                            entity = finishNode(factory2.createQualifiedName(entity, parseRightSideOfDot(allowReservedWords, 
                            /* allowPrivateIdentifiers */
                            false)), pos);
                        }
                        return entity;
                    }