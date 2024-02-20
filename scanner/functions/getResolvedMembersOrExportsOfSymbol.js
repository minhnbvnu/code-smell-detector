function getResolvedMembersOrExportsOfSymbol(symbol, resolutionKind) {
                const links = getSymbolLinks(symbol);
                if (!links[resolutionKind]) {
                    const isStatic2 = resolutionKind === "resolvedExports" /* resolvedExports */;
                    const earlySymbols = !isStatic2 ? symbol.members : symbol.flags & 1536 /* Module */ ? getExportsOfModuleWorker(symbol).exports : symbol.exports;
                    links[resolutionKind] = earlySymbols || emptySymbols;
                    const lateSymbols = createSymbolTable();
                    for (const decl of symbol.declarations || emptyArray) {
                        const members = getMembersOfDeclaration(decl);
                        if (members) {
                            for (const member of members) {
                                if (isStatic2 === hasStaticModifier(member)) {
                                    if (hasLateBindableName(member)) {
                                        lateBindMember(symbol, earlySymbols, lateSymbols, member);
                                    }
                                }
                            }
                        }
                    }
                    const assignments = symbol.assignmentDeclarationMembers;
                    if (assignments) {
                        const decls = arrayFrom(assignments.values());
                        for (const member of decls) {
                            const assignmentKind = getAssignmentDeclarationKind(member);
                            const isInstanceMember = assignmentKind === 3 /* PrototypeProperty */ || isBinaryExpression(member) && isPossiblyAliasedThisProperty(member, assignmentKind) || assignmentKind === 9 /* ObjectDefinePrototypeProperty */ || assignmentKind === 6 /* Prototype */;
                            if (isStatic2 === !isInstanceMember) {
                                if (hasLateBindableName(member)) {
                                    lateBindMember(symbol, earlySymbols, lateSymbols, member);
                                }
                            }
                        }
                    }
                    links[resolutionKind] = combineSymbolTables(earlySymbols, lateSymbols) || emptySymbols;
                }
                return links[resolutionKind];
            }