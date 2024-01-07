function defineType(type) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var inherits = opts.inherits && store[opts.inherits] || {};

	  opts.fields = opts.fields || inherits.fields || {};
	  opts.visitor = opts.visitor || inherits.visitor || [];
	  opts.aliases = opts.aliases || inherits.aliases || [];
	  opts.builder = opts.builder || inherits.builder || opts.visitor || [];

	  if (opts.deprecatedAlias) {
	    DEPRECATED_KEYS[opts.deprecatedAlias] = type;
	  }

	  for (var _iterator4 = opts.visitor.concat(opts.builder), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
	    var _ref4;

	    if (_isArray4) {
	      if (_i4 >= _iterator4.length) break;
	      _ref4 = _iterator4[_i4++];
	    } else {
	      _i4 = _iterator4.next();
	      if (_i4.done) break;
	      _ref4 = _i4.value;
	    }

	    var _key5 = _ref4;

	    opts.fields[_key5] = opts.fields[_key5] || {};
	  }

	  for (var key in opts.fields) {
	    var field = opts.fields[key];

	    if (opts.builder.indexOf(key) === -1) {
	      field.optional = true;
	    }
	    if (field.default === undefined) {
	      field.default = null;
	    } else if (!field.validate) {
	      field.validate = assertValueType(getType(field.default));
	    }
	  }

	  VISITOR_KEYS[type] = opts.visitor;
	  BUILDER_KEYS[type] = opts.builder;
	  NODE_FIELDS[type] = opts.fields;
	  ALIAS_KEYS[type] = opts.aliases;

	  store[type] = opts;
	}