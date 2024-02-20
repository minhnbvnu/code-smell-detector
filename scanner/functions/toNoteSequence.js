function toNoteSequence(notes, duration){
	return quantizeNoteSequence(
		{
			ticksPerQuarter : 220,
			totalTime : duration,
			timeSignatures : [
				{
					time : 0,
					numerator : 4,
					denominator : 4
				}
			],
			tempos : [
				{
					time : 0,
					qpm : 60
				}
			],
			notes : notes.filter(n => !n.muted)
		},
		4
	)
}