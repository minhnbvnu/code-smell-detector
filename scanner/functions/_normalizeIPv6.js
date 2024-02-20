function _normalizeIPv6(host, protocol) {
            var matches = host.match(protocol.IPV6ADDRESS) || [];
            var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
            if (address) {
                var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
                var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
                var lastFields = last.split(":").map(_stripLeadingZeros);
                var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
                var fieldCount = isLastFieldIPv4Address ? 7 : 8;
                var lastFieldsStart = lastFields.length - fieldCount;
                var fields = Array(fieldCount);
                for (var x = 0; x < fieldCount; ++x) {
                    fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
                }
                if (isLastFieldIPv4Address) {
                    fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
                }
                var allZeroFields = fields.reduce(function (acc, field, index) {
                    if (!field || field === "0") {
                        var lastLongest = acc[acc.length - 1];
                        if (lastLongest && lastLongest.index + lastLongest.length === index) {
                            lastLongest.length++;
                        }
                        else {
                            acc.push({ index: index, length: 1 });
                        }
                    }
                    return acc;
                }, []);
                var longestZeroFields = allZeroFields.sort(function (a, b) {
                    return b.length - a.length;
                })[0];
                var newHost = void 0;
                if (longestZeroFields && longestZeroFields.length > 1) {
                    var newFirst = fields.slice(0, longestZeroFields.index);
                    var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
                    newHost = newFirst.join(":") + "::" + newLast.join(":");
                }
                else {
                    newHost = fields.join(":");
                }
                if (zone) {
                    newHost += "%" + zone;
                }
                return newHost;
            }
            else {
                return host;
            }
        }