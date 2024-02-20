function countSolns(n)
{
    //print('in countSolns()');

    // All columns are initially unused
    var unused = [];
    for (var i = 0; i < n; ++i)
        unused[unused.length] = i;

    // The board is initially empty
    var board = [];

    var numSolns = nQueens(unused, board, 0, n);

    return numSolns;
}