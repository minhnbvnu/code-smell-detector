function mandreelAppStartRenderWebGL()
	{
/* The following code was removed for benchmarking:
		var canvas = document.getElementById(mandreelAppCanvasName);

		mandreelAppCanvasWidth = canvas.width;
		mandreelAppCanvasHeight = canvas.height;

		// Register event handlers
		if(window.addEventListener){ window.addEventListener('DOMMouseScroll',mandreel_wheel,false); }  window.onmousewheel=document.onmousewheel=mandreel_wheel;

		window.addEventListener('mousedown',imandreel_onMouseDown,false);
		window.addEventListener('mouseup',imandreel_onMouseUp,false);
		window.addEventListener('mousemove',imandreel_onMouseMove,false);
		window.addEventListener('dblclick',imandreel_onMouseDblClick,false);

		document.body.oncontextmenu = function() { return false;};

		var canvasDiv = document.getElementById(mandreelAppCanvasDiv);
		canvasDiv.addEventListener('keydown',imandreel_onKeyDown,false);
		canvasDiv.addEventListener('keyup',imandreel_onKeyUp,false);
		canvasDiv.focus();*/

		// Call mandreel app init funtion (__init())
		mandreelAppInit();

		// Start rendering
		imandreel_is_ready = 1;
		//imandreel_render();
	}