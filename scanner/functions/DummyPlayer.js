function DummyPlayer(sys) {
    this.maxSamplerate     = 48000;
    this.defaultSamplerate = 44100;
    this.env = "node";

    var tid = 0;

    this.play = function() {
        if (tid) {
            clearInterval(tid);
        }
        
        tid = setInterval(function() {
            var n = sys.streamsize / sys.cellsize;
            while (n--) {
                sys.process();
            }
        }.bind(this), 5);
    };

    this.pause = function() {
        clearInterval(tid);
    };
}