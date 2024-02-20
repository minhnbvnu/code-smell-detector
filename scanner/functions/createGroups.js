function createGroups(node) {
                if (node.properties.length === 1) {
                    return [node.properties];
                }
                return node.properties.reduce((groups, property) => {
                    const currentGroup = last(groups), prev = last(currentGroup);
                    if (!prev || continuesPropertyGroup(prev, property)) {
                        currentGroup.push(property);
                    }
                    else {
                        groups.push([property]);
                    }
                    return groups;
                }, [
                    []
                ]);
            }