function diffuse2(x, x0, y, y0, dt)
    {
        var a = 0;
        lin_solve2(x, x0, y, y0, a, 1 + 4 * a);
    }