function progressbar_set(obj,val,text,over)
{
	if (val<0.05) val=0;
	if (val>1) val=1;
	var innerBar=null;
	var innerText=null;
	for(var i=0;i<obj.children.length;i++)
	{
		if(obj.children[i].className=="openwebrx-progressbar-text") innerText=obj.children[i];
		else if(obj.children[i].className=="openwebrx-progressbar-bar") innerBar=obj.children[i];
	}
	if(innerBar==null) return;
	//.h: function animate(object,style_name,unit,from,to,accel,time_ms,fps,to_exec)
	animate(innerBar,"width","px",innerBar.clientWidth,val*obj.clientWidth,0.7,700,60);
	//innerBar.style.width=(val*100).toFixed(0)+"%";
	innerBar.style.backgroundColor=(over)?"#ff6262":"#00aba6";
	if(innerText==null) return;
	innerText.innerHTML=text;
}