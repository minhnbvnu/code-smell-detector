function spmvRun(dim, density, stddev, iterations) {
    var m = generateRandomCSR(dim, density, stddev);
    var v = new Float32Array(dim);
    var y = new Float32Array(dim);
    var out = new Float32Array(dim);
    ArrayOld.prototype.forEach.call(v, function(n, i, a) { a[i] = randf(); });

    var t1 =  performance.now();
    for(var i = 0; i < iterations; ++i) spmv_csr(m.Ax, dim, m.Arow, m.Acol, v, y, out);
    var t2 = performance.now();

    console.log("The total time for the spmv is " + (t2-t1)/1000 + " seconds");
    return { status: 1,
             options: "spmvRun(" + [dim, density, stddev].join(",") + ")",
             time: (t2 - t1) / 1000 };
}