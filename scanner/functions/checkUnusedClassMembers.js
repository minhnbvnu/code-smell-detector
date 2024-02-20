function checkUnusedClassMembers(node, addDiagnostic) {
                for (const member of node.members) {
                    switch (member.kind) {
                        case 171 /* MethodDeclaration */:
                        case 169 /* PropertyDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            if (member.kind === 175 /* SetAccessor */ && member.symbol.flags & 32768 /* GetAccessor */) {
                                break;
                            }
                            const symbol = getSymbolOfDeclaration(member);
                            if (!symbol.isReferenced && (hasEffectiveModifier(member, 8 /* Private */) || isNamedDeclaration(member) && isPrivateIdentifier(member.name)) && !(member.flags & 16777216 /* Ambient */)) {
                                addDiagnostic(member, 0 /* Local */, createDiagnosticForNode(member.name, Diagnostics._0_is_declared_but_its_value_is_never_read, symbolToString(symbol)));
                            }
                            break;
                        case 173 /* Constructor */:
                            for (const parameter of member.parameters) {
                                if (!parameter.symbol.isReferenced && hasSyntacticModifier(parameter, 8 /* Private */)) {
                                    addDiagnostic(parameter, 0 /* Local */, createDiagnosticForNode(parameter.name, Diagnostics.Property_0_is_declared_but_its_value_is_never_read, symbolName(parameter.symbol)));
                                }
                            }
                            break;
                        case 178 /* IndexSignature */:
                        case 237 /* SemicolonClassElement */:
                        case 172 /* ClassStaticBlockDeclaration */:
                            break;
                        default:
                            Debug.fail("Unexpected class member");
                    }
                }
            }