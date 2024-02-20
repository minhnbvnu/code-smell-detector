function set_bnd(b, x)
    {
        if (b===1) {
            for (var i = 1; i <= width; i++) {
                x[i] =  x[i + rowSize];
                x[i + (height+1) *rowSize] = x[i + height * rowSize];
            }

            for (var j = 1; i <= height; i++) {
                x[j * rowSize] = -x[1 + j * rowSize];
                x[(width + 1) + j * rowSize] = -x[width + j * rowSize];
            }
        } else if (b === 2) {
            for (var i = 1; i <= width; i++) {
                x[i] = -x[i + rowSize];
                x[i + (height + 1) * rowSize] = -x[i + height * rowSize];
            }

            for (var j = 1; j <= height; j++) {
                x[j * rowSize] =  x[1 + j * rowSize];
                x[(width + 1) + j * rowSize] =  x[width + j * rowSize];
            }
        } else {
            for (var i = 1; i <= width; i++) {
                x[i] =  x[i + rowSize];
                x[i + (height + 1) * rowSize] = x[i + height * rowSize];
            }

            for (var j = 1; j <= height; j++) {
                x[j * rowSize] =  x[1 + j * rowSize];
                x[(width + 1) + j * rowSize] =  x[width + j * rowSize];
            }
        }
        var maxEdge = (height + 1) * rowSize;
        x[0]                 = 0.5 * (x[1] + x[rowSize]);
        x[maxEdge]           = 0.5 * (x[1 + maxEdge] + x[height * rowSize]);
        x[(width+1)]         = 0.5 * (x[width] + x[(width + 1) + rowSize]);
        x[(width+1)+maxEdge] = 0.5 * (x[width + maxEdge] + x[(width + 1) + height * rowSize]);
    }