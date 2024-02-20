function getRankOrder(memberGroups, orderConfig) {
        let rank = -1;
        const stack = memberGroups.slice(); // Get a copy of the member groups
        while (stack.length > 0 && rank === -1) {
            const memberGroup = stack.shift();
            rank = orderConfig.findIndex(memberType => Array.isArray(memberType)
                ? memberType.includes(memberGroup)
                : memberType === memberGroup);
        }
        return rank;
    }