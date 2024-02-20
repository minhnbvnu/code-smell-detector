function queryCommits(url, page) {
        $.getJSON(url + '&page=' + page, function (commits) {
            if (commits.length > 0) {
                drawPunchCard(getBuckets(commits));
                queryCommits(url, page + 1);
            }
        });
    }