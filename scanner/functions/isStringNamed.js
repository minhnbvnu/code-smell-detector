function isStringNamed(d) {
                    const name = getNameOfDeclaration(d);
                    return !!name && isStringLiteral(name);
                }