function soundSourceOnEnded() {
    if (this.state === 'PLAYING') {
        this.state = 'ENDED';
        this.resumePositionMs = this.audioContext.currentTime * 1000 - this.startTimeMs;
    }
    activeSoundHandleMap.delete(this.handle);

    // The specification is unclear on whether we must disconnect
    // the nodes or not when the sound ends.
    this.gainNode.disconnect();
    this.panNode.disconnect();
    this.disconnect();
}