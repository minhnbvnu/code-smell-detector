function reduce_page_rank(page_ranks, maps, n){
    var i, j;
    var dif = 0.0;
    var new_rank, old_rank;

    for(j=0; j<n; ++j){
        old_rank = page_ranks[j];
        new_rank = 0.0;
        for(i=0; i<n; ++i){
          new_rank += maps[i*n + j];
        }

        new_rank = ((1-d_factor)/n)+(d_factor*new_rank);
        dif = Math.abs(new_rank - old_rank) > dif ? Math.abs(new_rank - old_rank) : dif;
        page_ranks[j] = new_rank;
    }
    return dif;
}