function trackExistingEntityName(node, context, includePrivateSymbol) {
                    let introducesError = false;
                    const leftmost = getFirstIdentifier(node);
                    if (isInJSFile(node) && (isExportsIdentifier(leftmost) || isModuleExportsAccessExpression(leftmost.parent) || isQualifiedName(leftmost.parent) && isModuleIdentifier(leftmost.parent.left) && isExportsIdentifier(leftmost.parent.right))) {
                        introducesError = true;
                        return { introducesError, node };
                    }
                    const sym = resolveEntityName(leftmost, 67108863 /* All */, 
                    /*ignoreErrors*/
                    true, 
                    /*dontResolveALias*/
                    true);
                    if (sym) {
                        if (isSymbolAccessible(sym, context.enclosingDeclaration, 67108863 /* All */, 
                        /*shouldComputeAliasesToMakeVisible*/
                        false).accessibility !== 0 /* Accessible */) {
                            introducesError = true;
                        }
                        else {
                            context.tracker.trackSymbol(sym, context.enclosingDeclaration, 67108863 /* All */);
                            includePrivateSymbol == null ? void 0 : includePrivateSymbol(sym);
                        }
                        if (isIdentifier(node)) {
                            const type = getDeclaredTypeOfSymbol(sym);
                            const name = sym.flags & 262144 /* TypeParameter */ && !isTypeSymbolAccessible(type.symbol, context.enclosingDeclaration) ? typeParameterToName(type, context) : factory.cloneNode(node);
                            name.symbol = sym;
                            return { introducesError, node: setEmitFlags(setOriginalNode(name, node), 33554432 /* NoAsciiEscaping */) };
                        }
                    }
                    return { introducesError, node };
                }