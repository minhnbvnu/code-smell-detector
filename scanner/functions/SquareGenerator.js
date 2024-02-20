function SquareGenerator(freq, phase) {
    var self = {
        'alive': true
    };
    var period = sampleRate / freq;
    var t = 0;

    self.generate = function(buf, offset, count) {
        for (; count; count--) {
            var result = ((t / period) % 1 > phase ? 1 : -1);
            buf[offset++] += result;
            buf[offset++] += result;
            t++;
        }
    }

    return self;
}