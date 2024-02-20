function processRingBuffer () {
	if (this.ringBuffer) {
		(this.channelMode === 'interleaved' ? this.ringSpin : this.ringSpinInterleaved).apply(this, arguments);
	}
}