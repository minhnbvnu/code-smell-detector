function imandreel_render()
	{
		if( ABORT )
			return;

		var canvas = Mandreel_document.getElementById(mandreelAppCanvasName);
		WebGLUtils.requestAnimationFrame(canvas, imandreel_render);


		// Reshape
		if (canvas.clientWidth != mandreelAppCanvasWidth || canvas.clientHeight != mandreelAppCanvasHeight)
		{
			mandreelAppCanvasWidth = canvas.clientWidth;
			mandreelAppCanvasHeight = canvas.clientHeight;
			imandreel_gl.viewport(0, 0, mandreelAppCanvasWidth, mandreelAppCanvasHeight);
		}

		// Set the focus to the canvas div
		if (mandreelAppForceFocus)
		{
			var canvasDiv = Mandreel_document.getElementById(mandreelAppCanvasDiv);
			canvasDiv.focus();
		}

		// Call mandreel app draw funtion (__draw())
		var nowTime = Date_now();
		if (!g_mandreel_frame_locked)
		{
			g_mandreel_frame_inframe = true;
			if (!_imandreel_pause_game)
				mandreelAppDraw(nowTime-imandreel_oldTime);
			g_mandreel_frame_inframe = false;
		}
		imandreel_oldTime = nowTime;
	}