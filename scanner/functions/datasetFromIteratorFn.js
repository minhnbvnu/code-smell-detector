function datasetFromIteratorFn(iteratorFn, size) {
	  if (size === void 0) {
	    size = null;
	  }

	  return new ( /*#__PURE__*/function (_Dataset) {
	    _inheritsLoose(_class, _Dataset);

	    function _class() {
	      var _this;

	      _this = _Dataset.apply(this, arguments) || this;
	      _this.size = size;
	      return _this;
	    }
	    /*
	     * Provide a new stream of elements.  Note this will also start new streams
	     * from any underlying `Dataset`s.
	     */


	    var _proto2 = _class.prototype;

	    _proto2.iterator =
	    /*#__PURE__*/
	    function () {
	      var _iterator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
	        return regeneratorRuntime.wrap(function _callee15$(_context15) {
	          while (1) {
	            switch (_context15.prev = _context15.next) {
	              case 0:
	                return _context15.abrupt("return", iteratorFn());

	              case 1:
	              case "end":
	                return _context15.stop();
	            }
	          }
	        }, _callee15);
	      }));

	      function iterator() {
	        return _iterator.apply(this, arguments);
	      }

	      return iterator;
	    }();

	    return _class;
	  }(Dataset))();
	}