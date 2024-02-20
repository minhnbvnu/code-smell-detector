function declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes) {
                switch (container.kind) {
                    case 264 /* ModuleDeclaration */:
                        return declareModuleMember(node, symbolFlags, symbolExcludes);
                    case 308 /* SourceFile */:
                        return declareSourceFileMember(node, symbolFlags, symbolExcludes);
                    case 228 /* ClassExpression */:
                    case 260 /* ClassDeclaration */:
                        return declareClassMember(node, symbolFlags, symbolExcludes);
                    case 263 /* EnumDeclaration */:
                        return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                    case 184 /* TypeLiteral */:
                    case 325 /* JSDocTypeLiteral */:
                    case 207 /* ObjectLiteralExpression */:
                    case 261 /* InterfaceDeclaration */:
                    case 289 /* JsxAttributes */:
                        return declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);
                    case 181 /* FunctionType */:
                    case 182 /* ConstructorType */:
                    case 176 /* CallSignature */:
                    case 177 /* ConstructSignature */:
                    case 326 /* JSDocSignature */:
                    case 178 /* IndexSignature */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 173 /* Constructor */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 320 /* JSDocFunctionType */:
                    case 172 /* ClassStaticBlockDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                    case 197 /* MappedType */:
                        if (container.locals)
                            Debug.assertNode(container, canHaveLocals);
                        return declareSymbol(container.locals, 
                        /*parent*/
                        void 0, node, symbolFlags, symbolExcludes);
                }
            }