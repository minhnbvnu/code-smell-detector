function secondary_demod_start(subtype) 
{ 
    secondary_demod_canvases_initialized = false;
    ws.send("SET secondary_mod="+subtype); 
    secondary_demod = subtype; 
}