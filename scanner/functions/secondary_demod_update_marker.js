function secondary_demod_update_marker()
{
    var width =  Math.max( (secondary_bw / (if_samp_rate/2)) * secondary_demod_canvas_width, 5);
    var center_at = (secondary_demod_channel_freq / (if_samp_rate/2)) * secondary_demod_canvas_width + secondary_demod_canvas_left;
    var left = center_at-width/2;
    //console.log("sdum", width, left);
    $("#openwebrx-digimode-select-channel").width(width).css("left",left+"px") 
}