function maximum(a,b,c){
    var k;
    if( a <= b )
        k = b;
    else
        k = a;

    if( k <=c )
        return(c);
    else
        return(k);
}