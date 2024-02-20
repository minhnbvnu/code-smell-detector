function expRamp(t, tMax, v0, v1)
{
    if (Math.sign(v0) == -Math.sign(v1))
        return v0;

    if (v0 == 0)
        return v0;

    return v0 * Math.pow(v1 / v0, t / tMax);
}