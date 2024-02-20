function _recomposeAuthority(components, options) {
            var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
            var uriTokens = [];
            if (components.userinfo !== undefined) {
                uriTokens.push(components.userinfo);
                uriTokens.push("@");
            }
            if (components.host !== undefined) {
                //normalize IP hosts, add brackets and escape zone separator for IPv6
                uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
                    return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
                }));
            }
            if (typeof components.port === "number" || typeof components.port === "string") {
                uriTokens.push(":");
                uriTokens.push(String(components.port));
            }
            return uriTokens.length ? uriTokens.join("") : undefined;
        }