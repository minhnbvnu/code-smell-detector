function secondary_demod_swap_canvases()
{
    console.log("swap");
    secondary_demod_canvases[0+!secondary_demod_current_canvas_index].openwebrx_top-=$(secondary_demod_canvas_container).height()*2;
    secondary_demod_current_canvas_index=0+!secondary_demod_current_canvas_index;
    secondary_demod_current_canvas_context = secondary_demod_canvases[secondary_demod_current_canvas_index].getContext("2d");
    secondary_demod_current_canvas_actual_line=$(secondary_demod_canvas_container).height()-1;
}