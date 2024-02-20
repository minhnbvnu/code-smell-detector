function zoom_center_where_calc(screenposX)
{
	//return (screenposX-(window.innerWidth-canvas_container.clientWidth))/canvas_container.clientWidth;
	return screenposX/canvas_container.clientWidth;
}