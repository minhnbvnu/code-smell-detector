function printIM(aa,  m,  n){
    var i=0;
    var j=0;
    for(i=0; i<m;++i){
        for(j=0; j<n;++j){
            console.log(aa[i*n+j]);
        }
    }
}