function weightsLoaderFactory(fetchWeightsFunction) {
	  return /*#__PURE__*/function () {
	    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(manifest, filePathPrefix, weightNames) {
	      var groupIndicesToFetchMap, groupWeightsToFetch, weightsFound, allManifestWeightNames, weightsNotFound, groupIndicesToFetch, fetchUrls, buffers, weightsTensorMap, bufferIndexOffset;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (filePathPrefix === void 0) {
	                filePathPrefix = '';
	              }

	              // Collect all the groups, weights, and their relative offsets to be
	              // fetched.
	              groupIndicesToFetchMap = manifest.map(function () {
	                return false;
	              });
	              groupWeightsToFetch = {};
	              weightsFound = weightNames != null ? weightNames.map(function () {
	                return false;
	              }) : [];
	              allManifestWeightNames = [];
	              manifest.forEach(function (manifestGroupConfig, groupIndex) {
	                var groupOffset = 0;
	                manifestGroupConfig.weights.forEach(function (weightsEntry) {
	                  var rawDtype = 'quantization' in weightsEntry ? weightsEntry.quantization.dtype : weightsEntry.dtype;
	                  var weightsBytes = DTYPE_VALUE_SIZE_MAP[rawDtype] * sizeFromShape(weightsEntry.shape);

	                  var enqueueWeightsForFetchingFn = function enqueueWeightsForFetchingFn() {
	                    groupIndicesToFetchMap[groupIndex] = true;

	                    if (groupWeightsToFetch[groupIndex] == null) {
	                      groupWeightsToFetch[groupIndex] = [];
	                    }

	                    groupWeightsToFetch[groupIndex].push({
	                      manifestEntry: weightsEntry,
	                      groupOffset: groupOffset,
	                      sizeBytes: weightsBytes
	                    });
	                  };

	                  if (weightNames != null) {
	                    weightNames.forEach(function (weightName, weightIndex) {
	                      if (weightName === weightsEntry.name) {
	                        enqueueWeightsForFetchingFn();
	                        weightsFound[weightIndex] = true;
	                      }
	                    });
	                  } else {
	                    enqueueWeightsForFetchingFn();
	                  }

	                  allManifestWeightNames.push(weightsEntry.name);
	                  groupOffset += weightsBytes;
	                });
	              });

	              if (weightsFound.every(function (found) {
	                return found;
	              })) {
	                _context.next = 9;
	                break;
	              }

	              weightsNotFound = weightNames.filter(function (_, i) {
	                return !weightsFound[i];
	              });
	              throw new Error("Could not find weights in manifest with names: " + (weightsNotFound.join(', ') + ". \n") + "Manifest JSON has weights with names: " + (allManifestWeightNames.join(', ') + "."));

	            case 9:
	              // Convert the one-hot boolean groupId => shouldFetch map to a list of group
	              // IDs.
	              groupIndicesToFetch = groupIndicesToFetchMap.reduce(function (accumulator, shouldFetch, i) {
	                if (shouldFetch) {
	                  accumulator.push(i);
	                }

	                return accumulator;
	              }, []);
	              fetchUrls = [];
	              groupIndicesToFetch.forEach(function (i) {
	                manifest[i].paths.forEach(function (filepath) {
	                  var fetchUrl = filePathPrefix + (!filePathPrefix.endsWith('/') ? '/' : '') + filepath;
	                  fetchUrls.push(fetchUrl);
	                });
	              });
	              _context.next = 14;
	              return fetchWeightsFunction(fetchUrls);

	            case 14:
	              buffers = _context.sent;
	              weightsTensorMap = {};
	              bufferIndexOffset = 0;
	              groupIndicesToFetch.forEach(function (i) {
	                var numBuffers = manifest[i].paths.length;
	                var groupBytes = 0;

	                for (var _i = 0; _i < numBuffers; _i++) {
	                  groupBytes += buffers[bufferIndexOffset + _i].byteLength;
	                } // Create a buffer for the whole group.


	                var groupBuffer = new ArrayBuffer(groupBytes);
	                var groupByteBuffer = new Uint8Array(groupBuffer);
	                var groupBufferOffset = 0;

	                for (var _i2 = 0; _i2 < numBuffers; _i2++) {
	                  var buffer = new Uint8Array(buffers[bufferIndexOffset + _i2]);
	                  groupByteBuffer.set(buffer, groupBufferOffset);
	                  groupBufferOffset += buffer.byteLength;
	                }

	                var weightsEntries = groupWeightsToFetch[i];
	                weightsEntries.forEach(function (weightsEntry) {
	                  var byteBuffer = groupBuffer.slice(weightsEntry.groupOffset, weightsEntry.groupOffset + weightsEntry.sizeBytes);
	                  var nameToTensorMap = decodeWeights(byteBuffer, [weightsEntry.manifestEntry]);

	                  for (var name in nameToTensorMap) {
	                    weightsTensorMap[name] = nameToTensorMap[name];
	                  }
	                });
	                bufferIndexOffset += numBuffers;
	              });
	              return _context.abrupt("return", weightsTensorMap);

	            case 19:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee);
	    }));

	    return function (_x7, _x8, _x9) {
	      return _ref.apply(this, arguments);
	    };
	  }();
	}