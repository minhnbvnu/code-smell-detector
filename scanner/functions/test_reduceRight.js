function test_reduceRight()
{
    if ([0,2,2,3,1].reduceRight(function(a,b){ return a * b; })  != 0)
        return 1;
    if ([1,2,4,5].reduceRight(function(a,b){ return a * b; }) != 40)
        return 2;
    if ([0,2,3,4].reduceRight(function(a,b){ return a + b; }, 4) != 13)
        return 3;
    if ([1,2,3].reduceRight(function(a,b){ return a * b; }, 4) != 24)
        return 4;

    // operations on sparse array
    var sparseArray = [];
    sparseArray[15] = 10;
    sparseArray[12] = 20;
    sparseArray[30] = 30;
    if (sparseArray.reduceRight(function(a,b){ return a-b; }, 100) != 40)
        return 5;
    if (sparseArray.reduceRight(function(a,b){return a+1;}) != 32)
        return 6;

    if (sparseArray.reduceRight(function(a,b){return a+1;}, 10) != 13)
        return 7;

    // operations on object passed as param
    var count = [1,2,3,4].reduceRight(function(a,b,i,thisObj){ thisObj.length--; return a+1; }, 0);
    if (count != 4)
        return 8;

    count = [1,2,3,4].reduceRight(function(a,b,i,thisObj){ thisObj.length++; return a+1; }, 0);
    if (count != 4)
        return 9;

    var opArr = [[0,1], [2,3], [4,5]].reduceRight(function(a,b) {return a.concat(b);}, []);
    if (!array_eq(opArr, [4,5,2,3,0,1]))
        return 10;

    opArr = [0,1,2,3,4,5].reduceRight(function(a,b,i) {return a.concat([i,b, i+b]);}, []);
    if (!array_eq(opArr, [5,5,10,4,4,8,3,3,6,2,2,4,1,1,2,0,0,0]))
         return 11;

    return 0;
}