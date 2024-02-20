function demodulator_set_offset_frequency(which,to_what)
{
	if(to_what>bandwidth/2||to_what<-bandwidth/2) return;
	demodulators[0].offset_frequency=Math.round(to_what);
	demodulators[0].set();
	mkenvelopes(get_visible_freq_range());
}