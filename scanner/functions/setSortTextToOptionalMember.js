function setSortTextToOptionalMember() {
                symbols.forEach((m) => {
                    var _a2;
                    if (m.flags & 16777216 /* Optional */) {
                        const symbolId = getSymbolId(m);
                        symbolToSortTextMap[symbolId] = (_a2 = symbolToSortTextMap[symbolId]) != null ? _a2 : SortText.OptionalMember;
                    }
                });
            }