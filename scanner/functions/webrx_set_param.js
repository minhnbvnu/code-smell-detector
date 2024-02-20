function webrx_set_param(what, value)
{
	ws.send("SET "+what+"="+value.toString());
}