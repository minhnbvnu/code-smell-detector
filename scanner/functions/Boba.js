function Boba(opts) {
      this.ga = this._getGA();
      if (typeof this.ga !== "undefined") {
        // Extend defaults with options.
        this.opts = Boba.$.extend(defaults, opts);

        // Watch anything defined in the options.
        if (typeof this.opts.watch !== "undefined") {
          for (var i = this.opts.watch.length - 1; i >= 0; i--) {
            this.watch.apply(this, this.opts.watch[i]);
          };
        }

        this.pageName = this.opts.pageName;
        this.siteName = this.opts.siteName;

        this.trackLinks = Boba.$.proxy(this.trackLinks, this);
        this.push = Boba.$.proxy(this.push, this);
        this.watch = Boba.$.proxy(this.watch, this);
        this._onTrackedClick = Boba.$.proxy(this._onTrackedClick, this);
      } else {
        console.warn("Google Analytics not found. Boba could not initialize.");
      }

      return this;
    }