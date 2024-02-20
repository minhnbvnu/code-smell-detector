function forEachSymbolTableInScope(enclosingDeclaration, callback) {
                let result;
                for (let location = enclosingDeclaration; location; location = location.parent) {
                    if (canHaveLocals(location) && location.locals && !isGlobalSourceFile(location)) {
                        if (result = callback(location.locals, 
                        /*ignoreQualification*/
                        void 0, 
                        /*isLocalNameLookup*/
                        true, location)) {
                            return result;
                        }
                    }
                    switch (location.kind) {
                        case 308 /* SourceFile */:
                            if (!isExternalOrCommonJsModule(location)) {
                                break;
                            }
                        case 264 /* ModuleDeclaration */:
                            const sym = getSymbolOfDeclaration(location);
                            if (result = callback((sym == null ? void 0 : sym.exports) || emptySymbols, 
                            /*ignoreQualification*/
                            void 0, 
                            /*isLocalNameLookup*/
                            true, location)) {
                                return result;
                            }
                            break;
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */:
                        case 261 /* InterfaceDeclaration */:
                            let table;
                            (getSymbolOfDeclaration(location).members || emptySymbols).forEach((memberSymbol, key) => {
                                if (memberSymbol.flags & (788968 /* Type */ & ~67108864 /* Assignment */)) {
                                    (table || (table = createSymbolTable())).set(key, memberSymbol);
                                }
                            });
                            if (table && (result = callback(table, 
                            /*ignoreQualification*/
                            void 0, 
                            /*isLocalNameLookup*/
                            false, location))) {
                                return result;
                            }
                            break;
                    }
                }
                return callback(globals, 
                /*ignoreQualification*/
                void 0, 
                /*isLocalNameLookup*/
                true);
            }