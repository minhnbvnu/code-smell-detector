function TimbreObject(numChannels, _args) {
            this._ = {}; // private members
            var e = this._.events = new EventEmitter(this);
            this._.emit = function() {
                return e.emit.apply(e, arguments);
            };
            if (isDictionary(_args[0])) {
                var params = _args.shift();
                var _in = params["in"];
                this.once("init", function() {
                    this.set(params);
                    if (_in) {
                        if (isArray(_in)) {
                            this.append.apply(this, _in);
                        } else if (_in instanceof TimbreObject) {
                            this.append(_in);
                        }
                    }
                });
            }

            this.tickID = -1;
            this.nodes  = _args.map(timbre);
            this.cells  = [];
            this.numChannels = numChannels;
            switch (numChannels) {
            case 0:
                this.L = this.R = new ChannelObject(null);
                this.cells[0] = this.cells[1] = this.cells[2] = this.L.cell;
                break;
            case 1:
                this.L = this.R = new ChannelObject(this);
                this.cells[0] = this.cells[1] = this.cells[2] = this.L.cell;
                break;
            case 2:
                this.L = new ChannelObject(this);
                this.R = new ChannelObject(this);
                this.cells[0] = new fn.SignalArray(_sys.cellsize);
                this.cells[1] = this.L.cell;
                this.cells[2] = this.R.cell;
                break;
            }
            this.playbackState = PLAYING_STATE;
            this.nodeType = TimbreObject.DSP;

            this._.ar  = true;
            this._.mul = 1;
            this._.add = 0;
            this._.dac = null;
            this._.bypassed = false;
            this._.meta = {};
            this._.samplerate = _sys.samplerate;
            this._.cellsize   = _sys.cellsize;
            this._.buddies    = [];
        }