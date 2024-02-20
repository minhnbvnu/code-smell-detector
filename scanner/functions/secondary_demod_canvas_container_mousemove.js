function secondary_demod_canvas_container_mousemove(evt)
{
    if(secondary_demod_mousedown) secondary_demod_update_channel_freq_from_event(evt);
}