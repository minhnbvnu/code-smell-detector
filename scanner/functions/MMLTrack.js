function MMLTrack(sequencer, trackNum, mml) {
            var _ = this._ = {};
            _.sequencer = sequencer;
            _.trackNum  = trackNum;
            _.commands  = compile(mml);
            _.status = {t:120, l:4, o:4, v:12, q:6, dot:0, tie:false};
            _.index    = 0;
            _.queue    = [];
            _.currentTime = 0;
            _.queueTime   = 0;
            _.segnoIndex  = -1;
            _.loopStack   = [];
            _.prevNote = 0;
            _.remain   = Infinity;
            this.ended = false;
            sched(this);
        }