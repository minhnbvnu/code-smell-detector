function checkObjectTypeForDuplicateDeclarations(node) {
                const names = /* @__PURE__ */ new Map();
                for (const member of node.members) {
                    if (member.kind === 168 /* PropertySignature */) {
                        let memberName;
                        const name = member.name;
                        switch (name.kind) {
                            case 10 /* StringLiteral */:
                            case 8 /* NumericLiteral */:
                                memberName = name.text;
                                break;
                            case 79 /* Identifier */:
                                memberName = idText(name);
                                break;
                            default:
                                continue;
                        }
                        if (names.get(memberName)) {
                            error(getNameOfDeclaration(member.symbol.valueDeclaration), Diagnostics.Duplicate_identifier_0, memberName);
                            error(member.name, Diagnostics.Duplicate_identifier_0, memberName);
                        }
                        else {
                            names.set(memberName, true);
                        }
                    }
                }
            }