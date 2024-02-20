function demodulator_add(what)
{
	demodulators.push(what);
	mkenvelopes(get_visible_freq_range());
}