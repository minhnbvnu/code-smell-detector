function setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, contextualMemberSymbols) {
                if (membersDeclaredBySpreadAssignment.size === 0) {
                    return;
                }
                for (const contextualMemberSymbol of contextualMemberSymbols) {
                    if (membersDeclaredBySpreadAssignment.has(contextualMemberSymbol.name)) {
                        symbolToSortTextMap[getSymbolId(contextualMemberSymbol)] = SortText.MemberDeclaredBySpreadAssignment;
                    }
                }
            }