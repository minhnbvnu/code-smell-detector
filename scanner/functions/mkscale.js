function mkscale()
{
	//clear the lower part of the canvas (where frequency scale resides; the upper part is used by filter envelopes):
	range=get_visible_freq_range();
	mkenvelopes(range); //when scale changes we will always have to redraw filter envelopes, too
	scale_ctx.clearRect(0,22,scale_ctx.canvas.width,scale_ctx.canvas.height-22);
	scale_ctx.strokeStyle = "#fff";
	scale_ctx.font = "bold 11px sans-serif";
	scale_ctx.textBaseline = "top";
	scale_ctx.fillStyle = "#fff";
	spacing=get_scale_mark_spacing(range);
	//console.log(spacing);
	marker_hz=Math.ceil(range.start/spacing.smallbw)*spacing.smallbw;
	text_h_pos=22+10+((is_firefox)?3:0);
	var text_to_draw;
	var ftext=function(f) {text_to_draw=format_frequency(spacing.params.format,f,spacing.params.pre_divide,spacing.params.decimals);}
	var last_large;
	for(;;)
	{
		var x=scale_px_from_freq(marker_hz,range);
		if(x>window.innerWidth) break;
		scale_ctx.beginPath();
		scale_ctx.moveTo(x, 22);
		if(marker_hz%spacing.params.large_marker_per_hz==0)
		{  //large marker
			if(typeof first_large == "undefined") var first_large=marker_hz;
			last_large=marker_hz;
			scale_ctx.lineWidth=3.5;
			scale_ctx.lineTo(x,22+11);
			ftext(marker_hz);
			var text_measured=scale_ctx.measureText(text_to_draw);
			scale_ctx.textAlign = "center";
			//advanced text drawing begins
			if( zoom_level==0 && (range.start+spacing.smallbw*spacing.ratio>marker_hz) && (x<text_measured.width/2) )
			{ //if this is the first overall marker when zoomed out...                  and if it would be clipped off the screen...
				if(scale_px_from_freq(marker_hz+spacing.smallbw*spacing.ratio,range)-text_measured.width>=scale_min_space_bw_texts)
				{ //and if we have enough space to draw it correctly without clipping
					scale_ctx.textAlign = "left";
					scale_ctx.fillText(text_to_draw, 0, text_h_pos);
				}
			}
			else if( zoom_level==0 && (range.end-spacing.smallbw*spacing.ratio<marker_hz) && (x>window.innerWidth-text_measured.width/2) )
			{ //     if this is the last overall marker when zoomed out...                 and if it would be clipped off the screen...
				if(window.innerWidth-text_measured.width-scale_px_from_freq(marker_hz-spacing.smallbw*spacing.ratio,range)>=scale_min_space_bw_texts)
				{ //and if we have enough space to draw it correctly without clipping
					scale_ctx.textAlign = "right";
					scale_ctx.fillText(text_to_draw, window.innerWidth, text_h_pos);
				}
			}
			else scale_ctx.fillText(text_to_draw, x, text_h_pos); //draw text normally
		}
		else
		{  //small marker
			scale_ctx.lineWidth=2;
			scale_ctx.lineTo(x,22+8);
		}
		marker_hz+=spacing.smallbw;
		scale_ctx.stroke();
	}
	if(zoom_level!=0)
	{ // if zoomed, we don't want the texts to disappear because their markers can't be seen
		// on the left side
		scale_ctx.textAlign = "center";
		var f=first_large-spacing.smallbw*spacing.ratio;
		var x=scale_px_from_freq(f,range);
		ftext(f);
		var w=scale_ctx.measureText(text_to_draw).width;
		if(x+w/2>0) scale_ctx.fillText(text_to_draw, x, 22+10);
		// on the right side
		f=last_large+spacing.smallbw*spacing.ratio;
		x=scale_px_from_freq(f,range);
		ftext(f);
		w=scale_ctx.measureText(text_to_draw).width;
		if(x-w/2<window.innerWidth) scale_ctx.fillText(text_to_draw, x, 22+10);
	}
}