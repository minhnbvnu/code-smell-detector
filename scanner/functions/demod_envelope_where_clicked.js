function demod_envelope_where_clicked(x, drag_ranges, key_modifiers)
{  // Check exactly what the user has clicked based on ranges returned by demod_envelope_draw().
	in_range=function(x,range) { return range.x1<=x&&range.x2>=x; }
	dr=demodulator.draggable_ranges;

	if(key_modifiers.shiftKey)
	{
		//Check first: shift + center drag emulates BFO knob
		if(drag_ranges.line_on_screen&&in_range(x,drag_ranges.line)) return dr.bfo;
		//Check second: shift + envelope drag emulates PBF knob
		if(drag_ranges.envelope_on_screen&&in_range(x,drag_ranges.whole_envelope)) return dr.pbs;
	}
	if(drag_ranges.envelope_on_screen)
	{
		// For low and high cut:
		if(in_range(x,drag_ranges.beginning)) return dr.beginning;
		if(in_range(x,drag_ranges.ending)) return dr.ending;
		// Last priority: having clicked anything else on the envelope, without holding the shift key
		if(in_range(x,drag_ranges.whole_envelope)) return dr.anything_else;
	}
	return dr.none; //User doesn't drag the envelope for this demodulator
}