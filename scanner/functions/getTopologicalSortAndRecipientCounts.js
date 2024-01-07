function getTopologicalSortAndRecipientCounts(fetches, feedDict) {
	  assert(fetches != null && fetches.length > 0, function () {
	    return "Expected at least one fetch, got none";
	  });
	  var finalSorted = [];
	  var finalRecipientMap = {};

	  if (fetches.length === 1) {
	    // Special-casing 1 fetch for efficiency.
	    var out = getTopologicalSortAndRecipientCountsForOneFetch(fetches[0], feedDict);
	    finalSorted = out.sorted;
	    finalRecipientMap = out.recipientMap;
	  } else {
	    var visited = new Set();

	    for (var _iterator4 = _createForOfIteratorHelperLoose(fetches), _step4; !(_step4 = _iterator4()).done;) {
	      var fetch = _step4.value;

	      var _getTopologicalSortAn = getTopologicalSortAndRecipientCountsForOneFetch(fetch, feedDict),
	          sorted = _getTopologicalSortAn.sorted,
	          recipientMap = _getTopologicalSortAn.recipientMap; // Merge sorted SymbolicTensor Arrays.


	      for (var _iterator5 = _createForOfIteratorHelperLoose(sorted), _step5; !(_step5 = _iterator5()).done;) {
	        var symbolicTensor = _step5.value;

	        if (!visited.has(symbolicTensor.name)) {
	          finalSorted.push(symbolicTensor);
	          visited.add(symbolicTensor.name);
	        }
	      } // Merge recipient maps.


	      var _loop = function _loop(name) {
	        if (finalRecipientMap[name] == null) {
	          finalRecipientMap[name] = new Set();
	        }

	        recipientMap[name].forEach(function (recipient) {
	          return finalRecipientMap[name].add(recipient);
	        });
	      };

	      for (var name in recipientMap) {
	        _loop(name);
	      }
	    }
	  }

	  return {
	    sorted: finalSorted,
	    recipientCounts: recipientMap2Counts(finalRecipientMap)
	  };
	}