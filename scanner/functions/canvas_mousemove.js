function canvas_mousemove(evt)
{
	if(!waterfall_setup_done) return;
	//element=e("webrx-freq-show");
	relativeX=(evt.offsetX)?evt.offsetX:evt.layerX;
	/*realX=(relativeX-element.clientWidth/2);
	maxX=(canvases[0].clientWidth-element.clientWidth);
	if(realX>maxX) realX=maxX;
	if(realX<0) realX=0;
	element.style.left=realX.toString()+"px";*/
	if(canvas_mouse_down)
	{
		if(!canvas_drag&&Math.abs(evt.pageX-canvas_drag_start_x)>canvas_drag_min_delta)
		{
			canvas_drag=true;
			canvas_container.style.cursor="move";
		}
		if(canvas_drag)
		{
			var deltaX=canvas_drag_last_x-evt.pageX;
			var deltaY=canvas_drag_last_y-evt.pageY;
			//zoom_center_where=zoom_center_where_calc(evt.pageX);
			var dpx=range.hps*deltaX;
			if(
				!(zoom_center_rel+dpx>(bandwidth/2-canvas_container.clientWidth*(1-zoom_center_where)*range.hps)) &&
				!(zoom_center_rel+dpx<-bandwidth/2+canvas_container.clientWidth*zoom_center_where*range.hps)
			) { zoom_center_rel+=dpx; }
//			-((canvases_new_width*(0.5+zoom_center_rel/bandwidth))-(winsize*zoom_center_where));
			resize_canvases(false);
			canvas_drag_last_x=evt.pageX;
			canvas_drag_last_y=evt.pageY;
			mkscale();
		}
	}
	else e("webrx-mouse-freq").innerHTML=format_frequency("{x} MHz",canvas_get_frequency(relativeX),1e6,4);
}