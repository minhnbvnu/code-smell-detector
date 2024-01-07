function SemVer(version, options) {
	    _classCallCheck(this, SemVer);
	    options = parseOptions(options);
	    if (version instanceof SemVer) {
	      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
	        return version;
	      } else {
	        version = version.version;
	      }
	    } else if (typeof version !== 'string') {
	      throw new TypeError("Invalid version. Must be a string. Got type \"".concat(_typeof(version), "\"."));
	    }
	    if (version.length > MAX_LENGTH) {
	      throw new TypeError("version is longer than ".concat(MAX_LENGTH, " characters"));
	    }
	    debug('SemVer', version, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    this.includePrerelease = !!options.includePrerelease;
	    var m = version.trim().match(options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL]);
	    if (!m) {
	      throw new TypeError("Invalid Version: ".concat(version));
	    }
	    this.raw = version;
	    this.major = +m[1];
	    this.minor = +m[2];
	    this.patch = +m[3];
	    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
	      throw new TypeError('Invalid major version');
	    }
	    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
	      throw new TypeError('Invalid minor version');
	    }
	    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
	      throw new TypeError('Invalid patch version');
	    }
	    if (!m[4]) {
	      this.prerelease = [];
	    } else {
	      this.prerelease = m[4].split('.').map(function (id) {
	        if (/^[0-9]+$/.test(id)) {
	          var num = +id;
	          if (num >= 0 && num < MAX_SAFE_INTEGER) {
	            return num;
	          }
	        }
	        return id;
	      });
	    }
	    this.build = m[5] ? m[5].split('.') : [];
	    this.format();
	  }