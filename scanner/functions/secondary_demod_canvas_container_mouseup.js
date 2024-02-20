function secondary_demod_canvas_container_mouseup(evt)
{
    if(evt.which==1) secondary_demod_mousedown=false;
    secondary_demod_update_channel_freq_from_event(evt);
}