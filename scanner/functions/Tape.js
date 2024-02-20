function Tape(soundbuffer) {
        this.fragments = [];
        if (soundbuffer) {
            var samplerate = soundbuffer.samplerate || 44100;
            var duration   = soundbuffer.buffer[0].length / samplerate;
            this.fragments.push(
                new Fragment(soundbuffer, 0, duration)
            );
        }
    }