function ludRun(size) {
    matrix = new Float64Array(size*size);
    randomMatrix(matrix, 0, 10000);
    console.log("Matrix of size: " + size);
    var t1 = performance.now();
    lud(size);
    var t2 = performance.now();
    console.log("Time consumed typed (s): " + ((t2-t1) / 1000).toFixed(6));
    return { status: 1,
             options: "ludRun(" + size + ")",
             time: (t2-t1) / 1000 };
}