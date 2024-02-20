function pulseOsc(time, freq, duty)
{
    var cyclePos = (time * freq) % 1;
    return (cyclePos < duty)? -1:1;
}