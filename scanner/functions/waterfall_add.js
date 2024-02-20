function waterfall_add(data)
{
	if(!waterfall_setup_done) return;
	var w=fft_size;

	//waterfall_shift();
	// ==== do scaling if required ====
	/*if(waterfall_dont_scale)
	{
		scaled=data;
		for(i=scaled.length;i<w;i++) scaled[i]=-100;
	}
	else
	{
		if ((to-from)==w)
		{
			scaled=data;
		}
		else if ((to-from)<w)
		{	//make line bigger
			pixel_per_point=w/(to-from);
			scaled=Array();
			j=0;
			remain=pixel_per_point;
			for(i=0; i<w; i++)
			{
				//thiscolor=data[j]*(remain-floor(remain))+data[j+1]*(1-(remain-floor(remain)))
				//nextcolor=data[j+1]*(remain-floor(remain))+data[j+2]*(1-(remain-floor(remain)))
				if(remain>1)
				{
					scaled[i]=data[j]*(remain/pixel_per_point)+data[j+1]*((1-remain)/pixel_per_point);
					remain--;
				}
				else
				{
					j++;
					scaled[i]=data[j]*(remain/pixel_per_point)+data[j+1]*((1-remain)/pixel_per_point);
					remain=pixel_per_point-(1-remain);
				}
			}

		}
		else
		{  //make line smaller (linear decimation, moving average)
			point_per_pixel=(to-from)/w;
			scaled=Array();
			j=0;
			remain=point_per_pixel;
			last_pixel=0;
			for(i=from; i<to; i++)
			{
				if(remain>1)
				{
					last_pixel+=data[i];
					remain--;
				}
				else
				{
					last_pixel+=data[i]*remain;
					scaled[j++]=last_pixel/point_per_pixel;
					last_pixel=data[i]*(1-remain);
					remain=point_per_pixel-(1-remain); //?
				}
			}
		}
	}

	//Add line to waterfall image
	base=(h-1)*w*4;
	for(x=0;x<w;x++)
	{
		color=waterfall_mkcolor(scaled[x]);
		for(i=0;i<4;i++)
			waterfall_image.data[base+x*4+i] = ((color>>>0)>>((3-i)*8))&0xff;
	}*/

	if(mathbox_mode==MATHBOX_MODES.WATERFALL)
	{
		//Handle mathbox
		for(var i=0;i<fft_size;i++) mathbox_data[i+mathbox_data_index*fft_size]=data[i];
		mathbox_shift();
	}
	else
	{
	//Add line to waterfall image
	oneline_image = canvas_context.createImageData(w,1);
	for(x=0;x<w;x++)
	{
		color=waterfall_mkcolor(data[x]);
		for(i=0;i<4;i++)
			oneline_image.data[x*4+i] = ((color>>>0)>>((3-i)*8))&0xff;
	}

	//Draw image
	canvas_context.putImageData(oneline_image, 0, canvas_actual_line--);
	shift_canvases();
	if(canvas_actual_line<0) add_canvas();
	}


}