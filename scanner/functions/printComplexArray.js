function printComplexArray(r, i) { // TA
    var a = [];
    for(var j=0; j < r.length; ++j) a[j] = r[j].toFixed(6) + " + " + i[j].toFixed(6) + "i";
    console.log(a.join("\n"));
}