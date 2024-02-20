function SoundSystem() {
            this.context = this;
            this.tickID = 0;
            this.impl = null;
            this.amp  = 0.8;
            this.status = FINISHED_STATE;
            this.samplerate = 44100;
            this.channels   = 2;
            this.cellsize   = 64;
            this.streammsec = 20;
            this.streamsize = 0;
            this.currentTime = 0;
            this.nextTicks = [];
            this.inlets    = [];
            this.timers    = [];
            this.listeners = [];

            this.deferred = null;
            this.recStart   = 0;
            this.recBuffers = null;
            this.delayProcess = make_delayProcess(this);

            this.events = null;

            fn.currentTimeIncr = this.cellsize * 1000 / this.samplerate;
            fn.emptycell = new fn.SignalArray(this.cellsize);

            this.reset(true);
        }