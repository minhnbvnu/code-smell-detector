function secondary_demod_init()
{
    $("#openwebrx-panel-digimodes")[0].openwebrxHidden = true;
    secondary_demod_canvas_container = $("#openwebrx-digimode-canvas-container")[0];
    $(secondary_demod_canvas_container)
        .mousemove(secondary_demod_canvas_container_mousemove)
        .mouseup(secondary_demod_canvas_container_mouseup)
        .mousedown(secondary_demod_canvas_container_mousedown)
        .mouseenter(secondary_demod_canvas_container_mousein)
        .mouseleave(secondary_demod_canvas_container_mouseout);
}