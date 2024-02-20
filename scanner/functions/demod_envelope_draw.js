function demod_envelope_draw(range, from, to, color, line)
{  //                                               ____
	// Draws a standard filter envelope like this: _/    \_
   // Parameters are given in offset frequency (Hz).
   // Envelope is drawn on the scale canvas.
	// A "drag range" object is returned, containing information about the draggable areas of the envelope
	// (beginning, ending and the line showing the offset frequency).
	if(typeof color == "undefined") color="#ffff00"; //yellow
	env_bounding_line_w=5;   //
	env_att_w=5;             //     _______   ___env_h2 in px   ___|_____
	env_h1=17;               //   _/|      \_ ___env_h1 in px _/   |_    \_
	env_h2=5;                //   |||env_att_line_w                |_env_lineplus
	env_lineplus=1;          //   ||env_bounding_line_w
	env_line_click_area=6;
	//range=get_visible_freq_range();
	from_px=scale_px_from_freq(from,range);
	to_px=scale_px_from_freq(to,range);
	if(to_px<from_px) /* swap'em */ { temp_px=to_px; to_px=from_px; from_px=temp_px; }

	/*from_px-=env_bounding_line_w/2;
	to_px+=env_bounding_line_w/2;*/
	from_px-=(env_att_w+env_bounding_line_w);
	to_px+=(env_att_w+env_bounding_line_w);
	// do drawing:
	scale_ctx.lineWidth=3;
	scale_ctx.strokeStyle=color;
	scale_ctx.fillStyle = color;
	var drag_ranges={ envelope_on_screen: false, line_on_screen: false };
	if(!(to_px<0||from_px>window.innerWidth)) // out of screen?
	{
		drag_ranges.beginning={x1:from_px, x2: from_px+env_bounding_line_w+env_att_w};
		drag_ranges.ending={x1:to_px-env_bounding_line_w-env_att_w, x2: to_px};
		drag_ranges.whole_envelope={x1:from_px, x2: to_px};
		drag_ranges.envelope_on_screen=true;
		scale_ctx.beginPath();
		scale_ctx.moveTo(from_px,env_h1);
		scale_ctx.lineTo(from_px+env_bounding_line_w, env_h1);
		scale_ctx.lineTo(from_px+env_bounding_line_w+env_att_w, env_h2);
		scale_ctx.lineTo(to_px-env_bounding_line_w-env_att_w, env_h2);
		scale_ctx.lineTo(to_px-env_bounding_line_w, env_h1);
		scale_ctx.lineTo(to_px, env_h1);
		scale_ctx.globalAlpha = 0.3;
		scale_ctx.fill();
		scale_ctx.globalAlpha = 1;
		scale_ctx.stroke();
	}
	if(typeof line != "undefined") // out of screen?
	{
		line_px=scale_px_from_freq(line,range);
		if(!(line_px<0||line_px>window.innerWidth))
		{
			drag_ranges.line={x1:line_px-env_line_click_area/2, x2: line_px+env_line_click_area/2};
			drag_ranges.line_on_screen=true;
			scale_ctx.moveTo(line_px,env_h1+env_lineplus);
			scale_ctx.lineTo(line_px,env_h2-env_lineplus);
			scale_ctx.stroke();
		}
	}
	return drag_ranges;
}