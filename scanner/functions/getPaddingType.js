function getPaddingType(prevNode, nextNode) {
                for (let i = configureList.length - 1; i >= 0; --i) {
                    const configure = configureList[i];
                    if (match(prevNode, configure.prev) &&
                        match(nextNode, configure.next)) {
                        return PaddingTypes[configure.blankLine];
                    }
                }
                return PaddingTypes.any;
            }