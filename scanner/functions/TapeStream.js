function TapeStream(tape, samplerate) {
        this.tape = tape;
        this.fragments  = tape.fragments;
        this.samplerate = samplerate || 44100;

        this.isEnded = false;
        this.buffer  = null;
        this.bufferIndex = 0;
        this.bufferIndexIncr  = 0;
        this.bufferBeginIndex = 0;
        this.bufferEndIndex   = 0;
        this.fragment      = null;
        this.fragmentIndex = 0;
        this.panL = 0.5;
        this.panR = 0.5;
    }