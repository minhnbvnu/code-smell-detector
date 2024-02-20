function ADEnv(time, attack, decay)
{
    if (time < attack)
    {
        return eerp(time/attack, 0, 1, 0.66);
    }

    time = time - attack;

    if (time < decay)
    {
        return eerp(time/decay, 1, 0, 0.66);
    }

    return 0;
}