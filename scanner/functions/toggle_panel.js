function toggle_panel(what, on)
{
    var item=e(what);
    if(typeof on !== "undefined") 
    {
        if(item.openwebrxHidden && !on) return;
        if(!item.openwebrxHidden && on) return;
    }
	if(item.openwebrxDisableClick) return;
	item.style.transitionDuration="599ms";
	item.style.transitionDelay="0ms";
	if(!item.openwebrxHidden)
	{
		window.setTimeout(function(){item.openwebrxHidden=!item.openwebrxHidden; place_panels(); item.openwebrxDisableClick=false;},700);
		item.style.transform="perspective( 599px ) rotateX( 90deg )";
	}
	else
	{
		item.openwebrxHidden=!item.openwebrxHidden; place_panels();
	    window.setTimeout(function(){ item.openwebrxDisableClick=false;},700);
		item.style.transform="perspective( 599px ) rotateX( 0deg )";
	}
	item.style.transitionDuration="0";

	item.openwebrxDisableClick=true;

}