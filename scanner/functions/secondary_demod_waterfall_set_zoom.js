function secondary_demod_waterfall_set_zoom(low_cut, high_cut)
{
    if(!secondary_demod || !secondary_demod_canvases_initialized) return;
    if(low_cut<0 && high_cut<0)
    {
        var hctmp = high_cut;
        var lctmp = low_cut;
        low_cut = -hctmp;
        low_cut = -lctmp;
    }
    else if(low_cut<0 && high_cut>0)
    {
        high_cut=Math.max(Math.abs(high_cut), Math.abs(low_cut));
        low_cut=0;
    }
    secondary_demod_low_cut = low_cut;
    secondary_demod_high_cut = high_cut;
    var shown_bw = high_cut-low_cut;
    secondary_demod_canvas_width = $(secondary_demod_canvas_container).width()  * (if_samp_rate/2)/shown_bw;
    secondary_demod_canvas_left = -secondary_demod_canvas_width*(low_cut/(if_samp_rate/2));
    //console.log("setzoom", secondary_demod_canvas_width, secondary_demod_canvas_left, low_cut, high_cut);
    secondary_demod_canvases.map((x)=>{$(x).css("left",secondary_demod_canvas_left+"px").css("width",secondary_demod_canvas_width+"px");});
    secondary_demod_update_channel_freq_from_event();
}