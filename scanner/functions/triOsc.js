function triOsc(time, freq, phase)
{
    var absPos = phase + time * freq;
    var cyclePos = absPos - (absPos | 0);

    if (cyclePos < 0.5)
        return (4 * cyclePos) - 1;
    else
        return 1 - (4 * (cyclePos - 0.5));
}