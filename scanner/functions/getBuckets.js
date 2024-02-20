function getBuckets(commits) {
        var i, j, date;
        if (buckets.length === 0) {
            for (i = 0; i < 7; i += 1) {
                buckets.push([]);
                for (j = 0; j < 24; j += 1) {
                    buckets[i].push(0);
                }
            }
        }
        for (i = 0; i < commits.length; i += 1) {
            date = new Date(commits[i].commit.author.date);
            buckets[date.getDay()][date.getHours()] += 1;
        }
        return buckets;
    }