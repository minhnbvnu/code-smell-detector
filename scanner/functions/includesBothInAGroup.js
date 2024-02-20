function includesBothInAGroup(groups, left, right) {
        return groups.some(group => group.includes(left) && group.includes(right));
    }