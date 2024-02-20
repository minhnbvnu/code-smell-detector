function typeParameterShadowsNameInScope(escapedName, context, type) {
                    const result = resolveName(context.enclosingDeclaration, escapedName, 788968 /* Type */, 
                    /*nameNotFoundArg*/
                    void 0, escapedName, 
                    /*isUse*/
                    false);
                    if (result) {
                        if (result.flags & 262144 /* TypeParameter */ && result === type.symbol) {
                            return false;
                        }
                        return true;
                    }
                    return false;
                }