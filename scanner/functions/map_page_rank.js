function map_page_rank(pages, page_ranks, maps, noutlinks, n){
    var i,j;
    for(i=0; i<n; ++i){
        var outbound_rank = page_ranks[i]/noutlinks[i];
        for(j=0; j<n; ++j){
            maps[i*n+j] = pages[i*n+j] === 0 ? 0 : pages[i*n+j]*outbound_rank;
        }
    }
}