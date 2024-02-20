function gameInit()
    {
        ball = {
            x : BALL_X_START,
            y : BALL_Y_START,
            // TODO: when computer is better, make serve random
            //x_d : (Math.floor( Math.random() * 2 ) == 1) ? 1 : -1,
            x_d : 1,
            y_d : 0
        };

        player1.y = PADDLE_Y_START;
        player1.y_d = 0;
        player2.y = PADDLE_Y_START;
        player2.y_d = 0;

        computer_move_d = (Math.floor( Math.random() * 2 ) == 1) ? 1 : -1;

    }