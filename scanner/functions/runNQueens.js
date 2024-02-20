function runNQueens(size){
    var us = {};
    var t1, t2;

    var solutions;

    t1 = performance.now();
    solutions = nqueenJS(size, us);
    t2 = performance.now();


    console.log("Size: " + size + " Time: " + (t2-t1)/1000 + " s Solutions: " +
                solutions + " Unique Solutions: " + us["solutions"]);
    return { status: 1,
             options: 'runNQueens(' + size + ')',
             time: (t2-t1)/1000 };
}