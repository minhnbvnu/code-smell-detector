function escapedTextsEqual(a, b) {
                                while (!isIdentifier(a) || !isIdentifier(b)) {
                                    if (!isIdentifier(a) && !isIdentifier(b) && a.right.escapedText === b.right.escapedText) {
                                        a = a.left;
                                        b = b.left;
                                    }
                                    else {
                                        return false;
                                    }
                                }
                                return a.escapedText === b.escapedText;
                            }