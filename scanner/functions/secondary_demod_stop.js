function secondary_demod_stop()
{
    ws.send("SET secondary_mod=off");
    secondary_demod = false; 
    secondary_demod_waterfall_queue = [];
}