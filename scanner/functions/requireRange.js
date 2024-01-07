function requireRange() {
	  if (hasRequiredRange) return range;
	  hasRequiredRange = 1;
	  var Range = function () {
	    function Range(range, options) {
	      var _this = this;
	      _classCallCheck(this, Range);
	      options = parseOptions(options);
	      if (range instanceof Range) {
	        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
	          return range;
	        } else {
	          return new Range(range.raw, options);
	        }
	      }
	      if (range instanceof Comparator) {
	        this.raw = range.value;
	        this.set = [[range]];
	        this.format();
	        return this;
	      }
	      this.options = options;
	      this.loose = !!options.loose;
	      this.includePrerelease = !!options.includePrerelease;
	      this.raw = range.trim().split(/\s+/).join(' ');
	      this.set = this.raw.split('||').map(function (r) {
	        return _this.parseRange(r.trim());
	      }).filter(function (c) {
	        return c.length;
	      });
	      if (!this.set.length) {
	        throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
	      }
	      if (this.set.length > 1) {
	        var first = this.set[0];
	        this.set = this.set.filter(function (c) {
	          return !isNullSet(c[0]);
	        });
	        if (this.set.length === 0) {
	          this.set = [first];
	        } else if (this.set.length > 1) {
	          var _iterator = _createForOfIteratorHelper(this.set),
	            _step;
	          try {
	            for (_iterator.s(); !(_step = _iterator.n()).done;) {
	              var c = _step.value;
	              if (c.length === 1 && isAny(c[0])) {
	                this.set = [c];
	                break;
	              }
	            }
	          } catch (err) {
	            _iterator.e(err);
	          } finally {
	            _iterator.f();
	          }
	        }
	      }
	      this.format();
	    }
	    _createClass(Range, [{
	      key: "format",
	      value: function format() {
	        this.range = this.set.map(function (comps) {
	          return comps.join(' ').trim();
	        }).join('||').trim();
	        return this.range;
	      }
	    }, {
	      key: "toString",
	      value: function toString() {
	        return this.range;
	      }
	    }, {
	      key: "parseRange",
	      value: function parseRange(range) {
	        var _this2 = this;
	        var memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
	        var memoKey = memoOpts + ':' + range;
	        var cached = cache.get(memoKey);
	        if (cached) {
	          return cached;
	        }
	        var loose = this.options.loose;
	        var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
	        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
	        debug('hyphen replace', range);
	        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
	        debug('comparator trim', range);
	        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
	        debug('tilde trim', range);
	        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
	        debug('caret trim', range);
	        var rangeList = range.split(' ').map(function (comp) {
	          return parseComparator(comp, _this2.options);
	        }).join(' ').split(/\s+/).map(function (comp) {
	          return replaceGTE0(comp, _this2.options);
	        });
	        if (loose) {
	          rangeList = rangeList.filter(function (comp) {
	            debug('loose invalid filter', comp, _this2.options);
	            return !!comp.match(re[t.COMPARATORLOOSE]);
	          });
	        }
	        debug('range list', rangeList);
	        var rangeMap = new Map();
	        var comparators = rangeList.map(function (comp) {
	          return new Comparator(comp, _this2.options);
	        });
	        var _iterator2 = _createForOfIteratorHelper(comparators),
	          _step2;
	        try {
	          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	            var comp = _step2.value;
	            if (isNullSet(comp)) {
	              return [comp];
	            }
	            rangeMap.set(comp.value, comp);
	          }
	        } catch (err) {
	          _iterator2.e(err);
	        } finally {
	          _iterator2.f();
	        }
	        if (rangeMap.size > 1 && rangeMap.has('')) {
	          rangeMap.delete('');
	        }
	        var result = _toConsumableArray(rangeMap.values());
	        cache.set(memoKey, result);
	        return result;
	      }
	    }, {
	      key: "intersects",
	      value: function intersects(range, options) {
	        if (!(range instanceof Range)) {
	          throw new TypeError('a Range is required');
	        }
	        return this.set.some(function (thisComparators) {
	          return isSatisfiable(thisComparators, options) && range.set.some(function (rangeComparators) {
	            return isSatisfiable(rangeComparators, options) && thisComparators.every(function (thisComparator) {
	              return rangeComparators.every(function (rangeComparator) {
	                return thisComparator.intersects(rangeComparator, options);
	              });
	            });
	          });
	        });
	      }
	    }, {
	      key: "test",
	      value: function test(version) {
	        if (!version) {
	          return false;
	        }
	        if (typeof version === 'string') {
	          try {
	            version = new SemVer(version, this.options);
	          } catch (er) {
	            return false;
	          }
	        }
	        for (var i = 0; i < this.set.length; i++) {
	          if (testSet(this.set[i], version, this.options)) {
	            return true;
	          }
	        }
	        return false;
	      }
	    }]);
	    return Range;
	  }();
	  range = Range;
	  var LRU = lruCache;
	  var cache = new LRU({
	    max: 1000
	  });
	  var parseOptions = parseOptions_1;
	  var Comparator = requireComparator();
	  var debug = debug_1;
	  var SemVer = semver$1;
	  var re = reExports.safeRe,
	    t = reExports.t,
	    comparatorTrimReplace = reExports.comparatorTrimReplace,
	    tildeTrimReplace = reExports.tildeTrimReplace,
	    caretTrimReplace = reExports.caretTrimReplace;
	  var FLAG_INCLUDE_PRERELEASE = constants.FLAG_INCLUDE_PRERELEASE,
	    FLAG_LOOSE = constants.FLAG_LOOSE;
	  var isNullSet = function isNullSet(c) {
	    return c.value === '<0.0.0-0';
	  };
	  var isAny = function isAny(c) {
	    return c.value === '';
	  };
	  var isSatisfiable = function isSatisfiable(comparators, options) {
	    var result = true;
	    var remainingComparators = comparators.slice();
	    var testComparator = remainingComparators.pop();
	    while (result && remainingComparators.length) {
	      result = remainingComparators.every(function (otherComparator) {
	        return testComparator.intersects(otherComparator, options);
	      });
	      testComparator = remainingComparators.pop();
	    }
	    return result;
	  };
	  var parseComparator = function parseComparator(comp, options) {
	    debug('comp', comp, options);
	    comp = replaceCarets(comp, options);
	    debug('caret', comp);
	    comp = replaceTildes(comp, options);
	    debug('tildes', comp);
	    comp = replaceXRanges(comp, options);
	    debug('xrange', comp);
	    comp = replaceStars(comp, options);
	    debug('stars', comp);
	    return comp;
	  };
	  var isX = function isX(id) {
	    return !id || id.toLowerCase() === 'x' || id === '*';
	  };
	  var replaceTildes = function replaceTildes(comp, options) {
	    return comp.trim().split(/\s+/).map(function (c) {
	      return replaceTilde(c, options);
	    }).join(' ');
	  };
	  var replaceTilde = function replaceTilde(comp, options) {
	    var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
	    return comp.replace(r, function (_, M, m, p, pr) {
	      debug('tilde', comp, _, M, m, p, pr);
	      var ret;
	      if (isX(M)) {
	        ret = '';
	      } else if (isX(m)) {
	        ret = ">=".concat(M, ".0.0 <").concat(+M + 1, ".0.0-0");
	      } else if (isX(p)) {
	        ret = ">=".concat(M, ".").concat(m, ".0 <").concat(M, ".").concat(+m + 1, ".0-0");
	      } else if (pr) {
	        debug('replaceTilde pr', pr);
	        ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
	      } else {
	        ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(M, ".").concat(+m + 1, ".0-0");
	      }
	      debug('tilde return', ret);
	      return ret;
	    });
	  };
	  var replaceCarets = function replaceCarets(comp, options) {
	    return comp.trim().split(/\s+/).map(function (c) {
	      return replaceCaret(c, options);
	    }).join(' ');
	  };
	  var replaceCaret = function replaceCaret(comp, options) {
	    debug('caret', comp, options);
	    var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
	    var z = options.includePrerelease ? '-0' : '';
	    return comp.replace(r, function (_, M, m, p, pr) {
	      debug('caret', comp, _, M, m, p, pr);
	      var ret;
	      if (isX(M)) {
	        ret = '';
	      } else if (isX(m)) {
	        ret = ">=".concat(M, ".0.0").concat(z, " <").concat(+M + 1, ".0.0-0");
	      } else if (isX(p)) {
	        if (M === '0') {
	          ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
	        } else {
	          ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(+M + 1, ".0.0-0");
	        }
	      } else if (pr) {
	        debug('replaceCaret pr', pr);
	        if (M === '0') {
	          if (m === '0') {
	            ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
	          } else {
	            ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
	          }
	        } else {
	          ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(+M + 1, ".0.0-0");
	        }
	      } else {
	        debug('no pr');
	        if (M === '0') {
	          if (m === '0') {
	            ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
	          } else {
	            ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
	          }
	        } else {
	          ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(+M + 1, ".0.0-0");
	        }
	      }
	      debug('caret return', ret);
	      return ret;
	    });
	  };
	  var replaceXRanges = function replaceXRanges(comp, options) {
	    debug('replaceXRanges', comp, options);
	    return comp.split(/\s+/).map(function (c) {
	      return replaceXRange(c, options);
	    }).join(' ');
	  };
	  var replaceXRange = function replaceXRange(comp, options) {
	    comp = comp.trim();
	    var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
	    return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
	      debug('xRange', comp, ret, gtlt, M, m, p, pr);
	      var xM = isX(M);
	      var xm = xM || isX(m);
	      var xp = xm || isX(p);
	      var anyX = xp;
	      if (gtlt === '=' && anyX) {
	        gtlt = '';
	      }
	      pr = options.includePrerelease ? '-0' : '';
	      if (xM) {
	        if (gtlt === '>' || gtlt === '<') {
	          ret = '<0.0.0-0';
	        } else {
	          ret = '*';
	        }
	      } else if (gtlt && anyX) {
	        if (xm) {
	          m = 0;
	        }
	        p = 0;
	        if (gtlt === '>') {
	          gtlt = '>=';
	          if (xm) {
	            M = +M + 1;
	            m = 0;
	            p = 0;
	          } else {
	            m = +m + 1;
	            p = 0;
	          }
	        } else if (gtlt === '<=') {
	          gtlt = '<';
	          if (xm) {
	            M = +M + 1;
	          } else {
	            m = +m + 1;
	          }
	        }
	        if (gtlt === '<') {
	          pr = '-0';
	        }
	        ret = "".concat(gtlt + M, ".").concat(m, ".").concat(p).concat(pr);
	      } else if (xm) {
	        ret = ">=".concat(M, ".0.0").concat(pr, " <").concat(+M + 1, ".0.0-0");
	      } else if (xp) {
	        ret = ">=".concat(M, ".").concat(m, ".0").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
	      }
	      debug('xRange return', ret);
	      return ret;
	    });
	  };
	  var replaceStars = function replaceStars(comp, options) {
	    debug('replaceStars', comp, options);
	    return comp.trim().replace(re[t.STAR], '');
	  };
	  var replaceGTE0 = function replaceGTE0(comp, options) {
	    debug('replaceGTE0', comp, options);
	    return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
	  };
	  var hyphenReplace = function hyphenReplace(incPr) {
	    return function ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
	      if (isX(fM)) {
	        from = '';
	      } else if (isX(fm)) {
	        from = ">=".concat(fM, ".0.0").concat(incPr ? '-0' : '');
	      } else if (isX(fp)) {
	        from = ">=".concat(fM, ".").concat(fm, ".0").concat(incPr ? '-0' : '');
	      } else if (fpr) {
	        from = ">=".concat(from);
	      } else {
	        from = ">=".concat(from).concat(incPr ? '-0' : '');
	      }
	      if (isX(tM)) {
	        to = '';
	      } else if (isX(tm)) {
	        to = "<".concat(+tM + 1, ".0.0-0");
	      } else if (isX(tp)) {
	        to = "<".concat(tM, ".").concat(+tm + 1, ".0-0");
	      } else if (tpr) {
	        to = "<=".concat(tM, ".").concat(tm, ".").concat(tp, "-").concat(tpr);
	      } else if (incPr) {
	        to = "<".concat(tM, ".").concat(tm, ".").concat(+tp + 1, "-0");
	      } else {
	        to = "<=".concat(to);
	      }
	      return "".concat(from, " ").concat(to).trim();
	    };
	  };
	  var testSet = function testSet(set, version, options) {
	    for (var i = 0; i < set.length; i++) {
	      if (!set[i].test(version)) {
	        return false;
	      }
	    }
	    if (version.prerelease.length && !options.includePrerelease) {
	      for (var _i = 0; _i < set.length; _i++) {
	        debug(set[_i].semver);
	        if (set[_i].semver === Comparator.ANY) {
	          continue;
	        }
	        if (set[_i].semver.prerelease.length > 0) {
	          var allowed = set[_i].semver;
	          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
	            return true;
	          }
	        }
	      }
	      return false;
	    }
	    return true;
	  };
	  return range;
	}