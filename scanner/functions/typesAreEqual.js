function typesAreEqual(a, b) {
                return (a === b ||
                    (a !== undefined &&
                        b !== undefined &&
                        sourceCode.getText(a.typeAnnotation) ===
                            sourceCode.getText(b.typeAnnotation)));
            }