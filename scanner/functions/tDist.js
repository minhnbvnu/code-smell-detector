function tDist(n) {
        if (n >= tDistribution.length)
            return tDistribution[tDistribution.length-1];
        return tDistribution[n];
    }