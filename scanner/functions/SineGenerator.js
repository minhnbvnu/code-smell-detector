function SineGenerator(freq) {
    var self = {
        'alive': true
    };
    var period = sampleRate / freq;
    var t = 0;

    self.generate = function(buf, offset, count) {
        for (; count; count--) {
            var phase = t / period;
            var result = Math.sin(phase * 2 * Math.PI);
            buf[offset++] += result;
            buf[offset++] += result;
            t++;
        }
    }

    return self;
}