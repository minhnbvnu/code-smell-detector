function getSpecialSearchKind(node) {
                        switch (node.kind) {
                            case 173 /* Constructor */:
                            case 135 /* ConstructorKeyword */:
                                return 1 /* Constructor */;
                            case 79 /* Identifier */:
                                if (isClassLike(node.parent)) {
                                    Debug.assert(node.parent.name === node);
                                    return 2 /* Class */;
                                }
                            default:
                                return 0 /* None */;
                        }
                    }