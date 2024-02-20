function interp(x, yL, yR, exp)
{
    // If the curve is increasing
    if (yR > yL)
    {
        return yL + Math.pow(x, exp) * (yR - yL);
    }
    else
    {
        return yR + Math.pow(1 - x, exp) * (yL - yR);
    }
}