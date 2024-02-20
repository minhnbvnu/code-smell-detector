function sortArray(a, start, finish) { // TA
    var t = ArrayOld.prototype.sort.call(a.subarray(start, finish), function(a, b) {return a-b;});
    for(var i = start; i<finish; ++i) {
        a[i] = t[i-start];
    }
}