function resize_waterfall_container(check_init)
{
	if(check_init&&!waterfall_setup_done) return;
	var numHeight;
	mathbox_container.style.height=canvas_container.style.height=(numHeight=window.innerHeight-e("webrx-top-container").clientHeight-e("openwebrx-scale-container").clientHeight).toString()+"px";
	if(mathbox)
	{
		//mathbox.three.camera.aspect = document.body.offsetWidth / numHeight;
  		//mathbox.three.camera.updateProjectionMatrix();
		mathbox.three.renderer.setSize(document.body.offsetWidth, numHeight);
		console.log(document.body.offsetWidth, numHeight);
	}

}