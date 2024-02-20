function trackSymbol(symbol, enclosingDeclaration2, meaning) {
                if (symbol.flags & 262144 /* TypeParameter */)
                    return false;
                const issuedDiagnostic = handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration2, meaning, 
                /*shouldComputeAliasesToMakeVisible*/
                true));
                recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForSymbol(symbol, meaning));
                return issuedDiagnostic;
            }