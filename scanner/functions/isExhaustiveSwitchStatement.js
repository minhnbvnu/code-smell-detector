function isExhaustiveSwitchStatement(node) {
                const links = getNodeLinks(node);
                if (links.isExhaustive === void 0) {
                    links.isExhaustive = 0;
                    const exhaustive = computeExhaustiveSwitchStatement(node);
                    if (links.isExhaustive === 0) {
                        links.isExhaustive = exhaustive;
                    }
                }
                else if (links.isExhaustive === 0) {
                    links.isExhaustive = false;
                }
                return links.isExhaustive;
            }