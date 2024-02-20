function divlog(what, is_error)
{
	is_error=!!is_error;
	was_error |= is_error;
	if(is_error)
	{
		what="<span class=\"webrx-error\">"+what+"</span>";
		if(e("openwebrx-panel-log").openwebrxHidden) toggle_panel("openwebrx-panel-log"); //show panel if any error is present
	}
	e("openwebrx-debugdiv").innerHTML+=what+"<br />";
	//var wls=e("openwebrx-log-scroll");
	//wls.scrollTop=wls.scrollHeight; //scroll to bottom
    $(".nano").nanoScroller();
    $(".nano").nanoScroller({ scroll: 'bottom' });
}