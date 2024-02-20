function checkList(nodes, shouldCheck) {
                const accessors = nodes
                    .filter(shouldCheck)
                    .filter(isAccessorKind)
                    .map(createAccessorData)
                    .reduce(mergeAccessorData, []);
                for (const { getters, setters } of accessors) {
                    // Don't report accessor properties that have duplicate getters or setters.
                    if (getters.length === 1 && setters.length === 1) {
                        const [getter] = getters, [setter] = setters, getterIndex = nodes.indexOf(getter), setterIndex = nodes.indexOf(setter), formerNode = getterIndex < setterIndex ? getter : setter, latterNode = getterIndex < setterIndex ? setter : getter;
                        if (Math.abs(getterIndex - setterIndex) > 1) {
                            report("notGrouped", formerNode, latterNode);
                        }
                        else if ((order === "getBeforeSet" && getterIndex > setterIndex) ||
                            (order === "setBeforeGet" && getterIndex < setterIndex)) {
                            report("invalidOrder", formerNode, latterNode);
                        }
                    }
                }
            }