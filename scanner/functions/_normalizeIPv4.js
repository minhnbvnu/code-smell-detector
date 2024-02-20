function _normalizeIPv4(host, protocol) {
            var matches = host.match(protocol.IPV4ADDRESS) || [];
            var _matches = slicedToArray(matches, 2), address = _matches[1];
            if (address) {
                return address.split(".").map(_stripLeadingZeros).join(".");
            }
            else {
                return host;
            }
        }