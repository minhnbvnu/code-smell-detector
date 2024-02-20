function secondary_demod_init_canvases()
{
    secondary_demod_remove_canvases();
    secondary_demod_canvases=[];
    secondary_demod_canvases.push(secondary_demod_create_canvas());
    secondary_demod_canvases.push(secondary_demod_create_canvas());
    secondary_demod_canvases[0].openwebrx_top=-$(secondary_demod_canvas_container).height();
    secondary_demod_canvases[1].openwebrx_top=0;
    secondary_demod_canvases_update_top();
    secondary_demod_current_canvas_context = secondary_demod_canvases[0].getContext("2d");
    secondary_demod_current_canvas_actual_line=$(secondary_demod_canvas_container).height()-1;
    secondary_demod_current_canvas_index=0;
    secondary_demod_canvases_initialized=true;
    //secondary_demod_update_channel_freq_from_event();
    mkscale(); //so that the secondary waterfall zoom level will be initialized
}