function first_show_panel(panel)
{
	panel.style.transitionDuration=0;
	panel.style.transitionDelay=0;
	rotx=(Math.random()>0.5)?-90:90;
	roty=0;
	if(Math.random()>0.5)
	{
		rottemp=rotx;
		rotx=roty;
		roty=rottemp;
	}
	if(rotx!=0 && Math.random()>0.5) rotx=270;
	//console.log(rotx,roty);
	transformString = "perspective( 599px ) rotateX( %1deg ) rotateY( %2deg )"
		.replace("%1",rotx.toString()).replace("%2",roty.toString());
	//console.log(transformString);
	//console.log(panel);
	panel.style.transform=transformString;
	window.setTimeout(function() {
		panel.style.transitionDuration="599ms";
		panel.style.transitionDelay=(Math.floor(Math.random()*500)).toString()+"ms";
		panel.style.transform="perspective( 599px ) rotateX( 0deg ) rotateY( 0deg )";
		//panel.style.transitionDuration="0ms";
		//panel.style.transitionDelay="0";
	}, 1);
}