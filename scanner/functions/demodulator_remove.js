function demodulator_remove(which)
{
	demodulators[which].stop();
	demodulators.splice(which,1);
}