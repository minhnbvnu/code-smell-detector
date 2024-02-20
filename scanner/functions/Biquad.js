function Biquad(samplerate) {
        this.samplerate = samplerate;
        this.frequency = 340;
        this.Q         = 1;
        this.gain      = 0;

        this.x1L = this.x2L = this.y1L = this.y2L = 0;
        this.x1R = this.x2R = this.y1R = this.y2R = 0;
        this.b0 = this.b1 = this.b2 = this.a1 = this.a2 = 0;

        this.setType("lpf");
    }