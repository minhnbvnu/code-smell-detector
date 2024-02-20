function visitMetaProperty(node) {
                if (node.keywordToken === 103 /* NewKeyword */ && node.name.escapedText === "target") {
                    hierarchyFacts |= 32768 /* NewTarget */;
                    return factory2.createUniqueName("_newTarget", 16 /* Optimistic */ | 32 /* FileLevel */);
                }
                return node;
            }