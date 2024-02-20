function printM(a, m, n){
    console.log("Printing Matrix:");
    for(var i =0; i<m; ++i){
        console.log("[" +
                    Array.prototype.join.call(Array.prototype.slice.call(a, i*m, i*m + n), ",") +
                    "]");
    }
}