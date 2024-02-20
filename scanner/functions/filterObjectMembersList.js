function filterObjectMembersList(contextualMemberSymbols, existingMembers) {
                if (existingMembers.length === 0) {
                    return contextualMemberSymbols;
                }
                const membersDeclaredBySpreadAssignment = /* @__PURE__ */ new Set();
                const existingMemberNames = /* @__PURE__ */ new Set();
                for (const m of existingMembers) {
                    if (m.kind !== 299 /* PropertyAssignment */ && m.kind !== 300 /* ShorthandPropertyAssignment */ && m.kind !== 205 /* BindingElement */ && m.kind !== 171 /* MethodDeclaration */ && m.kind !== 174 /* GetAccessor */ && m.kind !== 175 /* SetAccessor */ && m.kind !== 301 /* SpreadAssignment */) {
                        continue;
                    }
                    if (isCurrentlyEditingNode(m)) {
                        continue;
                    }
                    let existingName;
                    if (isSpreadAssignment(m)) {
                        setMembersDeclaredBySpreadAssignment(m, membersDeclaredBySpreadAssignment);
                    }
                    else if (isBindingElement(m) && m.propertyName) {
                        if (m.propertyName.kind === 79 /* Identifier */) {
                            existingName = m.propertyName.escapedText;
                        }
                    }
                    else {
                        const name = getNameOfDeclaration(m);
                        existingName = name && isPropertyNameLiteral(name) ? getEscapedTextOfIdentifierOrLiteral(name) : void 0;
                    }
                    if (existingName !== void 0) {
                        existingMemberNames.add(existingName);
                    }
                }
                const filteredSymbols = contextualMemberSymbols.filter((m) => !existingMemberNames.has(m.escapedName));
                setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);
                return filteredSymbols;
            }