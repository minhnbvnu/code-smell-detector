function shift_canvases()
{
	canvases.forEach(function(p)
	{
		p.style.top=(p.openwebrx_top++).toString()+"px";
	});
	canvas_maxshift++;
	if(canvas_container.clientHeight>canvas_maxshift)
	{
		canvas_phantom.style.top=canvas_maxshift.toString()+"px";
		canvas_phantom.style.height=(canvas_container.clientHeight-canvas_maxshift).toString()+"px";
		canvas_phantom.style.display="block";
	}
	else
		canvas_phantom.style.display="none";


	//canvas_container.style.height=(((canvases.length-1)*canvas_default_height)+(canvas_default_height-canvas_actual_line)).toString()+"px";
	//canvas_container.style.height="100%";
}