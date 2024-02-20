function filterJsxAttributes(symbols2, attributes) {
                const seenNames = /* @__PURE__ */ new Set();
                const membersDeclaredBySpreadAssignment = /* @__PURE__ */ new Set();
                for (const attr of attributes) {
                    if (isCurrentlyEditingNode(attr)) {
                        continue;
                    }
                    if (attr.kind === 288 /* JsxAttribute */) {
                        seenNames.add(attr.name.escapedText);
                    }
                    else if (isJsxSpreadAttribute(attr)) {
                        setMembersDeclaredBySpreadAssignment(attr, membersDeclaredBySpreadAssignment);
                    }
                }
                const filteredSymbols = symbols2.filter((a) => !seenNames.has(a.escapedName));
                setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);
                return filteredSymbols;
            }