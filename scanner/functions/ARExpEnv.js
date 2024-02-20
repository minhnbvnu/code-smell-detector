function ARExpEnv(time, attack, release)
{
    if (time < attack)
    {
        return time / attack;
    }
    else
    {
        time = (time - attack) / release;

        var rExp = 2;

        if (time < 1)
            return interp(time, 1, 0, rExp);

        return 0;
    }
}