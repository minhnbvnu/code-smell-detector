async function reconstructBySize(inSeq, models, temperature=1){
	inSeq = quantizeNoteSequence(inSeq, STEPS_PER_QUARTER)

	// Process in as large of chunks as possible.
	const maxChunkSize = models.length * STEPS_PER_BAR
	const secondsPerStep = 1 / sequences.stepsPerQuarterToStepsPerSecond(
		STEPS_PER_QUARTER, inSeq.tempos[0].qpm)
	const outputs = []
	for (let startOffset = 0; startOffset < inSeq.totalQuantizedSteps; startOffset+=maxChunkSize){
		const chunk = clone(inSeq)
		const endOffset = Math.min(startOffset + maxChunkSize, inSeq.totalQuantizedSteps)
		chunk.notes = inSeq.notes
			.map(n => Object.assign({}, n))
			.filter(n => startOffset <= n.quantizedStartStep && n.quantizedStartStep < endOffset)
			.map(n => {
				n.startTime -= startOffset * secondsPerStep
				n.endTime -= startOffset * secondsPerStep
				n.quantizedStartStep -= startOffset
				n.quantizedEndStep -= startOffset
				return n
			})
		chunk.totalQuantizedSteps = endOffset - startOffset
		chunk.totalTime = chunk.totalQuantizedSteps * secondsPerStep

		// Select model based on the number of actual bars in the chunk.
		const numBars = Math.ceil(chunk.totalQuantizedSteps / STEPS_PER_BAR)
		const modelIndex = numBars - 1
		const z = await models[modelIndex].encode([chunk])
		const output = await models[modelIndex].decode(z, temperature, undefined, undefined, inSeq.tempos[0].qpm)
		z.dispose()
		outputs.push(output[0])
	}
	const reconstruction = concat(...outputs)
	return reconstruction
}