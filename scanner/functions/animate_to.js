function animate_to(object,style_name,unit,to,accel,time_ms,fps,to_exec)
{
	from=parseFloat(style_value(object,style_name));
	animate(object,style_name,unit,from,to,accel,time_ms,fps,to_exec);
}