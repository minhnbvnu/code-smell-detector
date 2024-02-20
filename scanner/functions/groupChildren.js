function groupChildren(children, groupOn) {
            const result = [];
            let group2;
            for (const child of children) {
                if (groupOn(child)) {
                    group2 = group2 || [];
                    group2.push(child);
                }
                else {
                    if (group2) {
                        result.push(createSyntaxList2(group2));
                        group2 = void 0;
                    }
                    result.push(child);
                }
            }
            if (group2) {
                result.push(createSyntaxList2(group2));
            }
            return result;
        }