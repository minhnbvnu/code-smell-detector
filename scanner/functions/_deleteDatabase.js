function _deleteDatabase() {
	  _deleteDatabase = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
	    var idbFactory;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            idbFactory = getIndexedDBFactory();
	            return _context5.abrupt("return", new Promise(function (resolve, reject) {
	              var deleteRequest = idbFactory.deleteDatabase(DATABASE_NAME);

	              deleteRequest.onsuccess = function () {
	                return resolve();
	              };

	              deleteRequest.onerror = function (error) {
	                return reject(error);
	              };
	            }));

	          case 2:
	          case "end":
	            return _context5.stop();
	        }
	      }
	    }, _callee5);
	  }));
	  return _deleteDatabase.apply(this, arguments);
	}