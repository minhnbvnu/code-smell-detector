function getAcceptControllingResponse(responses) {
                if (!_immutable2.default.OrderedMap.isOrderedMap(responses)) {
                    return null
                }
                if (!responses.size) {
                    return null
                }
                var suitable2xxResponse = responses.find(function(res, k) {
                    return k.startsWith("2") && (0, _keys2.default)(res.get("content") || {}).length > 0
                });
                var defaultResponse = responses.get("default") || _immutable2.default.OrderedMap();
                var defaultResponseMediaTypes = (defaultResponse.get("content") || _immutable2.default.OrderedMap()).keySeq().toJS();
                var suitableDefaultResponse = defaultResponseMediaTypes.length ? defaultResponse : null;
                return suitable2xxResponse || suitableDefaultResponse
            }