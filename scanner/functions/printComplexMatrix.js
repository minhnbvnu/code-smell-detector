function printComplexMatrix(m){
    for(var i = 0; i < m.length; ++i)
        printComplexArray(m[i]["r"], m[i]["i"]);
}