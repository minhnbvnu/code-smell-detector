function secondary_demod_update_channel_freq_from_event(evt)
{
    if(typeof evt !== "undefined")
    {
        var relativeX=(evt.offsetX)?evt.offsetX:evt.layerX;
        secondary_demod_channel_freq=secondary_demod_low_cut + 
            (relativeX/$(secondary_demod_canvas_container).width()) * (secondary_demod_high_cut-secondary_demod_low_cut);
    }
    //console.log("toset:", secondary_demod_channel_freq);
    if(!secondary_demod_waiting_for_set)
    {
        secondary_demod_waiting_for_set = true;
        window.setTimeout(()=>{
            ws.send("SET secondary_offset_freq="+Math.floor(secondary_demod_channel_freq));
            //console.log("doneset:", secondary_demod_channel_freq);
            secondary_demod_waiting_for_set = false;
        }, 50);
    }
    secondary_demod_update_marker();
}