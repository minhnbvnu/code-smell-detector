function ADSRGenerator(child, attackAmplitude, sustainAmplitude, attackTimeS, decayTimeS, releaseTimeS) {
    var self = {
        'alive': true
    }
    var attackTime = sampleRate * attackTimeS;
    var decayTime = sampleRate * (attackTimeS + decayTimeS);
    var decayRate = (attackAmplitude - sustainAmplitude) / (decayTime - attackTime);
    var releaseTime = null; /* not known yet */
    var endTime = null; /* not known yet */
    var releaseRate = sustainAmplitude / (sampleRate * releaseTimeS);
    var t = 0;

    self.noteOff = function() {
        if (self.released) return;
        releaseTime = t;
        self.released = true;
        endTime = releaseTime + sampleRate * releaseTimeS;
    }

    self.generate = function(buf, offset, count) {
        if (!self.alive) return;
        var input = new Array(count * 2);
        for (var i = 0; i < count * 2; i++) {
            input[i] = 0;
        }
        child.generate(input, 0, count);

        childOffset = 0;
        while (count) {
            if (releaseTime != null) {
                if (t < endTime) {
                    /* release */
                    while (count && t < endTime) {
                        var ampl = sustainAmplitude - releaseRate * (t - releaseTime);
                        buf[offset++] += input[childOffset++] * ampl;
                        buf[offset++] += input[childOffset++] * ampl;
                        t++;
                        count--;
                    }
                } else {
                    /* dead */
                    self.alive = false;
                    return;
                }
            } else if (t < attackTime) {
                /* attack */
                while (count && t < attackTime) {
                    var ampl = attackAmplitude * t / attackTime;
                    buf[offset++] += input[childOffset++] * ampl;
                    buf[offset++] += input[childOffset++] * ampl;
                    t++;
                    count--;
                }
            } else if (t < decayTime) {
                /* decay */
                while (count && t < decayTime) {
                    var ampl = attackAmplitude - decayRate * (t - attackTime);
                    buf[offset++] += input[childOffset++] * ampl;
                    buf[offset++] += input[childOffset++] * ampl;
                    t++;
                    count--;
                }
            } else {
                /* sustain */
                while (count) {
                    buf[offset++] += input[childOffset++] * sustainAmplitude;
                    buf[offset++] += input[childOffset++] * sustainAmplitude;
                    t++;
                    count--;
                }
            }
        }
    }

    return self;
}