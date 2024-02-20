function printBoard(board)
{
    for (var i = 0; i < board.length; ++i)
    {
        var rowStr = '';

        for (var j = 0; j < board.length; ++j)
        {
            if (board[i] === j)
                rowStr += 'X';
            else
                rowStr += ' ';

            if (j != board.length - 1)
                rowStr += ',';
        }

        print(rowStr);
    }
}