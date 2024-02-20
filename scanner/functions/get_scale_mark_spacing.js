function get_scale_mark_spacing(range)
{
	out={};
	fcalc=function(freq)
	{
		out.numlarge=(range.bw/freq);
		out.large=canvas_container.clientWidth/out.numlarge; 	//distance between large markers (these have text)
		out.ratio=5; 														//(ratio-1) small markers exist per large marker
		out.small=out.large/out.ratio; 								//distance between small markers
		if(out.small<scale_min_space_bw_small_markers) return false;
		if(out.small/2>=scale_min_space_bw_small_markers&&freq.toString()[0]!="5") {out.small/=2; out.ratio*=2; }
		out.smallbw=freq/out.ratio;
		return true;
	}
	for(i=scale_markers_levels.length-1;i>=0;i--)
	{
		mp=scale_markers_levels[i];
		if (!fcalc(mp.large_marker_per_hz)) continue;
		//console.log(mp.large_marker_per_hz);
		//console.log(out);
		if (out.large-mp.estimated_text_width>scale_min_space_bw_texts) break;
	}
	out.params=mp;
	return out;
}