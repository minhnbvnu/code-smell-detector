function Comparator(comp, options) {
	      _classCallCheck(this, Comparator);
	      options = parseOptions(options);
	      if (comp instanceof Comparator) {
	        if (comp.loose === !!options.loose) {
	          return comp;
	        } else {
	          comp = comp.value;
	        }
	      }
	      comp = comp.trim().split(/\s+/).join(' ');
	      debug('comparator', comp, options);
	      this.options = options;
	      this.loose = !!options.loose;
	      this.parse(comp);
	      if (this.semver === ANY) {
	        this.value = '';
	      } else {
	        this.value = this.operator + this.semver.version;
	      }
	      debug('comp', this);
	    }