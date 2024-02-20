function computeEnumMemberValues(node) {
                const nodeLinks2 = getNodeLinks(node);
                if (!(nodeLinks2.flags & 1024 /* EnumValuesComputed */)) {
                    nodeLinks2.flags |= 1024 /* EnumValuesComputed */;
                    let autoValue = 0;
                    for (const member of node.members) {
                        const value = computeMemberValue(member, autoValue);
                        getNodeLinks(member).enumMemberValue = value;
                        autoValue = typeof value === "number" ? value + 1 : void 0;
                    }
                }
            }