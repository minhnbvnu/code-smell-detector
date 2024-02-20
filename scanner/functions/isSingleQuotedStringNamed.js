function isSingleQuotedStringNamed(d) {
                    const name = getNameOfDeclaration(d);
                    return !!(name && isStringLiteral(name) && (name.singleQuote || !nodeIsSynthesized(name) && startsWith(getTextOfNode(name, 
                    /*includeTrivia*/
                    false), "'")));
                }