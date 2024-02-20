function recordDeclarationName({ name }, names) {
                if (isIdentifier(name)) {
                    names.add(name.escapedText);
                }
                else {
                    for (const element of name.elements) {
                        if (!isOmittedExpression(element)) {
                            recordDeclarationName(element, names);
                        }
                    }
                }
            }