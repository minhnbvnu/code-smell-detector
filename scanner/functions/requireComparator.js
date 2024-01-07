function requireComparator() {
	  if (hasRequiredComparator) return comparator;
	  hasRequiredComparator = 1;
	  var ANY = Symbol('SemVer ANY');
	  var Comparator = function () {
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
	    _createClass(Comparator, [{
	      key: "parse",
	      value: function parse(comp) {
	        var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
	        var m = comp.match(r);
	        if (!m) {
	          throw new TypeError("Invalid comparator: ".concat(comp));
	        }
	        this.operator = m[1] !== undefined ? m[1] : '';
	        if (this.operator === '=') {
	          this.operator = '';
	        }
	        if (!m[2]) {
	          this.semver = ANY;
	        } else {
	          this.semver = new SemVer(m[2], this.options.loose);
	        }
	      }
	    }, {
	      key: "toString",
	      value: function toString() {
	        return this.value;
	      }
	    }, {
	      key: "test",
	      value: function test(version) {
	        debug('Comparator.test', version, this.options.loose);
	        if (this.semver === ANY || version === ANY) {
	          return true;
	        }
	        if (typeof version === 'string') {
	          try {
	            version = new SemVer(version, this.options);
	          } catch (er) {
	            return false;
	          }
	        }
	        return cmp(version, this.operator, this.semver, this.options);
	      }
	    }, {
	      key: "intersects",
	      value: function intersects(comp, options) {
	        if (!(comp instanceof Comparator)) {
	          throw new TypeError('a Comparator is required');
	        }
	        if (this.operator === '') {
	          if (this.value === '') {
	            return true;
	          }
	          return new Range(comp.value, options).test(this.value);
	        } else if (comp.operator === '') {
	          if (comp.value === '') {
	            return true;
	          }
	          return new Range(this.value, options).test(comp.semver);
	        }
	        options = parseOptions(options);
	        if (options.includePrerelease && (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
	          return false;
	        }
	        if (!options.includePrerelease && (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
	          return false;
	        }
	        if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
	          return true;
	        }
	        if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
	          return true;
	        }
	        if (this.semver.version === comp.semver.version && this.operator.includes('=') && comp.operator.includes('=')) {
	          return true;
	        }
	        if (cmp(this.semver, '<', comp.semver, options) && this.operator.startsWith('>') && comp.operator.startsWith('<')) {
	          return true;
	        }
	        if (cmp(this.semver, '>', comp.semver, options) && this.operator.startsWith('<') && comp.operator.startsWith('>')) {
	          return true;
	        }
	        return false;
	      }
	    }], [{
	      key: "ANY",
	      get: function get() {
	        return ANY;
	      }
	    }]);
	    return Comparator;
	  }();
	  comparator = Comparator;
	  var parseOptions = parseOptions_1;
	  var re = reExports.safeRe,
	    t = reExports.t;
	  var cmp = cmp_1;
	  var debug = debug_1;
	  var SemVer = semver$1;
	  var Range = requireRange();
	  return comparator;
	}