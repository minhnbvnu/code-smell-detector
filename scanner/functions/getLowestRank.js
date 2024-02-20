function getLowestRank(ranks, target, order) {
        let lowest = ranks[ranks.length - 1];
        ranks.forEach(rank => {
            if (rank > target) {
                lowest = Math.min(lowest, rank);
            }
        });
        const lowestRank = order[lowest];
        const lowestRanks = Array.isArray(lowestRank) ? lowestRank : [lowestRank];
        return lowestRanks.map(rank => rank.replace(/-/g, ' ')).join(', ');
    }