function eerp(x, yL, yR, exp)
{
    if (x >= 1)
    {
        return 0;
    }

    return yL + Math.pow(x, exp) * (yR - yL);
}