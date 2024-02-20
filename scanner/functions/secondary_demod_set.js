function secondary_demod_set()
{
    ws.send("SET secondary_offset_freq="+secondary_demod_offset_freq.toString());
}