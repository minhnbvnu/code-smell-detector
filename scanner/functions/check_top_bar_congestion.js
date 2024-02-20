function check_top_bar_congestion()
{
	var rmf=function(x){ return x.offsetLeft+x.offsetWidth; };
	var wet=e("webrx-rx-title");
	var wed=e("webrx-rx-desc");
	var rightmost=Math.max(rmf(wet),rmf(wed));
	var tl=e("openwebrx-main-buttons");

	[wet, wed].map(function(what) {
		if(rmf(what)>tl.offsetLeft-20) what.style.opacity=what.style.opacity="0";
		else wet.style.opacity=wed.style.opacity="1";
	});

}