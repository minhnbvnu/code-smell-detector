function random_pages(n, noutlinks, divisor){
    var i, j, k;
    var pages = new Int32Array(n*n);  // matrix cell i,j means link from j->i

    for(i=0; i<n; ++i){
        noutlinks[i] = 0;
        for(j=0; j<n; ++j){
            if(i!=j && (Math.abs(Math.commonRandom())%divisor === 0)){
                pages[i*n+j] = 1;
                noutlinks[i] += 1;
            }
        }

        // the case with no outlinks is afunctioned
        if(noutlinks[i] == 0){
            do { k = Math.abs(Math.commonRandom()) % n; } while ( k == i);
            pages[i*n + k] = 1;
            noutlinks[i] = 1;
        }
    }
    return pages;
}