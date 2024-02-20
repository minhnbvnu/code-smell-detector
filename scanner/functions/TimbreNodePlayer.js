function TimbreNodePlayer(sys) {
    
    this.maxSamplerate     = 48000;
    this.defaultSamplerate = 44100;
    this.env = "node";
    this.node = null;
    
    this.play = function() {
        this.node = new Readable();
        this.node._read = function(n, fn) {
            var inL = sys.strmL, inR = sys.strmR;
            var buf = new Buffer(n);
            
            var i, j = 0;
            var imax = inL.length;
            
            n = (n >> 2) / sys.streamsize;
            while (n--) {
                sys.process();
                for (i = 0; i < imax; ++i) {
                    buf.writeInt16LE((inL[i] * 32760)|0, j);
                    j += 2;
                    buf.writeInt16LE((inR[i] * 32760)|0, j);
                    j += 2;
                }
            }

            if (fn) {
                fn(null, buf);
            } else {
                this.push(buf);
            }
        };
        this.node.pipe(new Speaker({sampleRate:sys.samplerate}));
    };
    
    this.pause = function() {
        process.nextTick(this.node.emit.bind(this.node, "end"));
    };
}