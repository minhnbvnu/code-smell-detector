function getNameForJSDocFunctionParameter(p, index) {
                            return p.name && isIdentifier(p.name) && p.name.escapedText === "this" ? "this" : getEffectiveDotDotDotForParameter(p) ? `args` : `arg${index}`;
                        }