function TimbreFlashPlayer(sys) {
                var timerId = 0;

                this.maxSamplerate     = 44100;
                this.defaultSamplerate = 44100;
                this.env = "flash";

                this.play = function() {
                    var onaudioprocess;
                    var interleaved = new Array(sys.streamsize * sys.channels);
                    var streammsec  = sys.streammsec;
                    var written = 0;
                    var writtenIncr = sys.streamsize / sys.samplerate * 1000;
                    var start = Date.now();

                    onaudioprocess = function() {
                        if (written > Date.now() - start) {
                            return;
                        }
                        var inL = sys.strmL;
                        var inR = sys.strmR;
                        var i = interleaved.length;
                        var j = inL.length;
                        sys.process();
                        while (j--) {
                            interleaved[--i] = (inR[j] * 32768)|0;
                            interleaved[--i] = (inL[j] * 32768)|0;
                        }
                        swf.writeAudio(interleaved.join(" "));
                        written += writtenIncr;
                    };

                    if (swf.setup) {
                        swf.setup(sys.channels, sys.samplerate);
                        timerId = setInterval(onaudioprocess, streammsec);
                    } else {
                        console.warn("Cannot find " + src);
                    }
                };

                this.pause = function() {
                    if (timerId !== 0) {
                        swf.cancel();
                        clearInterval(timerId);
                        timerId = 0;
                    }
                };
            }