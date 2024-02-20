function StyleSlide(transitions1, rrmat1, opts) {
        this.transitions = transitions1;
        this.rrmat = rrmat1;
        this.transform = bind(this.transform, this);
        this.speed = (opts != null ? opts.speed : void 0) || this.rrmat.defSpeed;
        this.transitions = this._initTransitions(this.transitions);
        StyleSlide.__super__.constructor.apply(this, arguments);
      }