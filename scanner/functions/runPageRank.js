function runPageRank(n, iter, thresh, divisor){
    var n = n !== undefined ? n : 1000;
    var iter = iter !== undefined ? iter : 1000;
    var thresh = thresh !== undefined ? thresh : 0.00001;
    var divisor = divisor !== undefined ? divisor : 2;
    var pages;
    var maps;
    var page_ranks;
    var noutlinks;
    var t;
    var max_diff=Infinity;

    page_ranks = new Float64Array(n);
    maps = new Float64Array(n*n);
    noutlinks = new Int32Array(n);

    pages = random_pages(n,noutlinks, divisor);
    init_array(page_ranks, n, 1.0 / n);


    var nb_links = 0;
    for (var i=0; i<n; ++i) {
        for (var j=0; j<n; ++j) {
            nb_links += pages[i*n+j];
        }
    }
    //console.log("nb of links: " + nb_links + "/" + n*n);

    //console.log("PageRanks(0) : " + Array.prototype.join.call(page_ranks, " " ));
    var t1 = performance.now();

    for(t=1; t <= iter && max_diff >= thresh; ++t){
        map_page_rank(pages, page_ranks, maps, noutlinks, n);
        max_diff = reduce_page_rank(page_ranks, maps, n);

        /*
        //var s = "PageRanks("+t+") [diff=" + max_diff + "]: ";
        var sum = 0;
        for (var i = 0; i < n; ++i) {
            //s += page_ranks[i].toFixed(4) + " ";
            sum += page_ranks[i];
        }
        //console.log(s + " sum=" + sum.toFixed(3));
        */
    }
    var t2 = performance.now();


    if (n === 5000 && iter === 10 && thresh === 0.00000001 && divisor === 100000) {
        if (page_ranks.length !== expected_page_ranks.length) {
            throw new Error("Invalid length of page_ranks array");
        }
        for (var i = 0; i < expected_page_ranks; ++i) {
            if (page_ranks[i] !== expected_page_ranks[i]) {
                throw new Error("ERROR: page_ranks[" + i + "] differs from the expected value");
            }
        }

    } else {
        console.log("WARNING: No self-checking for n = '" + n + "', iteration = '" + iter + "', threshold = '" + thresh + "', and divisor = '" + divisor + "'");
    }

    console.log("T reached "+ t+ " at max dif " + max_diff + "\n");

    console.log("The total time taken for a random web of " + n + " pages is " +(t2-t1)/1000 + " seconds\n");

    return { status: 1,
             options: "runPageRank(" + [n, iter, thresh, divisor].join(",") + ")",
             time: (t2-t1)/1000 };
}