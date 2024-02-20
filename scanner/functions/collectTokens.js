function collectTokens(program, sourceFile, span, collector, cancellationToken) {
            const typeChecker = program.getTypeChecker();
            let inJSXElement = false;
            function visit(node) {
                switch (node.kind) {
                    case 264 /* ModuleDeclaration */:
                    case 260 /* ClassDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 259 /* FunctionDeclaration */:
                    case 228 /* ClassExpression */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        cancellationToken.throwIfCancellationRequested();
                }
                if (!node || !textSpanIntersectsWith(span, node.pos, node.getFullWidth()) || node.getFullWidth() === 0) {
                    return;
                }
                const prevInJSXElement = inJSXElement;
                if (isJsxElement(node) || isJsxSelfClosingElement(node)) {
                    inJSXElement = true;
                }
                if (isJsxExpression(node)) {
                    inJSXElement = false;
                }
                if (isIdentifier(node) && !inJSXElement && !inImportClause(node) && !isInfinityOrNaNString(node.escapedText)) {
                    let symbol = typeChecker.getSymbolAtLocation(node);
                    if (symbol) {
                        if (symbol.flags & 2097152 /* Alias */) {
                            symbol = typeChecker.getAliasedSymbol(symbol);
                        }
                        let typeIdx = classifySymbol2(symbol, getMeaningFromLocation(node));
                        if (typeIdx !== void 0) {
                            let modifierSet = 0;
                            if (node.parent) {
                                const parentIsDeclaration = isBindingElement(node.parent) || tokenFromDeclarationMapping.get(node.parent.kind) === typeIdx;
                                if (parentIsDeclaration && node.parent.name === node) {
                                    modifierSet = 1 << 0 /* declaration */;
                                }
                            }
                            if (typeIdx === 6 /* parameter */ && isRightSideOfQualifiedNameOrPropertyAccess2(node)) {
                                typeIdx = 9 /* property */;
                            }
                            typeIdx = reclassifyByType(typeChecker, node, typeIdx);
                            const decl = symbol.valueDeclaration;
                            if (decl) {
                                const modifiers = getCombinedModifierFlags(decl);
                                const nodeFlags = getCombinedNodeFlags(decl);
                                if (modifiers & 32 /* Static */) {
                                    modifierSet |= 1 << 1 /* static */;
                                }
                                if (modifiers & 512 /* Async */) {
                                    modifierSet |= 1 << 2 /* async */;
                                }
                                if (typeIdx !== 0 /* class */ && typeIdx !== 2 /* interface */) {
                                    if (modifiers & 64 /* Readonly */ || nodeFlags & 2 /* Const */ || symbol.getFlags() & 8 /* EnumMember */) {
                                        modifierSet |= 1 << 3 /* readonly */;
                                    }
                                }
                                if ((typeIdx === 7 /* variable */ || typeIdx === 10 /* function */) && isLocalDeclaration(decl, sourceFile)) {
                                    modifierSet |= 1 << 5 /* local */;
                                }
                                if (program.isSourceFileDefaultLibrary(decl.getSourceFile())) {
                                    modifierSet |= 1 << 4 /* defaultLibrary */;
                                }
                            }
                            else if (symbol.declarations && symbol.declarations.some((d) => program.isSourceFileDefaultLibrary(d.getSourceFile()))) {
                                modifierSet |= 1 << 4 /* defaultLibrary */;
                            }
                            collector(node, typeIdx, modifierSet);
                        }
                    }
                }
                forEachChild(node, visit);
                inJSXElement = prevInJSXElement;
            }
            visit(sourceFile);
        }