function _encodeWeights() {
	  _encodeWeights = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tensors, group) {
	    var specs, dataPromises, names, _loop, i, tensorValues;

	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            // TODO(adarob, cais): Support quantization.
	            specs = [];
	            dataPromises = [];
	            names = Array.isArray(tensors) ? tensors.map(function (tensor) {
	              return tensor.name;
	            }) : Object.keys(tensors);

	            _loop = function _loop(i) {
	              var name = names[i];
	              var t = Array.isArray(tensors) ? tensors[i].tensor : tensors[name];

	              if (t.dtype !== 'float32' && t.dtype !== 'int32' && t.dtype !== 'bool' && t.dtype !== 'string' && t.dtype !== 'complex64') {
	                throw new Error("Unsupported dtype in weight '" + name + "': " + t.dtype);
	              }

	              var spec = {
	                name: name,
	                shape: t.shape,
	                dtype: t.dtype
	              };

	              if (t.dtype === 'string') {
	                var utf8bytes = new Promise( /*#__PURE__*/function () {
	                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
	                    var vals, totalNumBytes, bytes, offset, _i6, val, bytesOfLength;

	                    return regeneratorRuntime.wrap(function _callee$(_context) {
	                      while (1) {
	                        switch (_context.prev = _context.next) {
	                          case 0:
	                            _context.next = 2;
	                            return t.bytes();

	                          case 2:
	                            vals = _context.sent;
	                            totalNumBytes = vals.reduce(function (p, c) {
	                              return p + c.length;
	                            }, 0) + NUM_BYTES_STRING_LENGTH * vals.length;
	                            bytes = new Uint8Array(totalNumBytes);
	                            offset = 0;

	                            for (_i6 = 0; _i6 < vals.length; _i6++) {
	                              val = vals[_i6];
	                              bytesOfLength = new Uint8Array(new Uint32Array([val.length]).buffer);
	                              bytes.set(bytesOfLength, offset);
	                              offset += NUM_BYTES_STRING_LENGTH;
	                              bytes.set(val, offset);
	                              offset += val.length;
	                            }

	                            resolve(bytes);

	                          case 8:
	                          case "end":
	                            return _context.stop();
	                        }
	                      }
	                    }, _callee);
	                  }));

	                  return function (_x3) {
	                    return _ref.apply(this, arguments);
	                  };
	                }());
	                dataPromises.push(utf8bytes);
	              } else {
	                dataPromises.push(t.data());
	              }

	              if (group != null) {
	                spec.group = group;
	              }

	              specs.push(spec);
	            };

	            for (i = 0; i < names.length; ++i) {
	              _loop(i);
	            }

	            _context2.next = 7;
	            return Promise.all(dataPromises);

	          case 7:
	            tensorValues = _context2.sent;
	            return _context2.abrupt("return", {
	              data: concatenateTypedArrays(tensorValues),
	              specs: specs
	            });

	          case 9:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee2);
	  }));
	  return _encodeWeights.apply(this, arguments);
	}