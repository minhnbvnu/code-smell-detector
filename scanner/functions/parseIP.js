function parseIP(ip) {
        const IPV4_PAT = /^(\d+)\.(\d+)\.(\d+)\.(\d+)(?::(\d+)){0,1}$/g;
        const IPV6_DOUBLE_COL_PAT = /^\[{0,1}([0-9a-f:]*)::([0-9a-f:]*)(?:\]:(\d+)){0,1}$/g;
        const ipv4Matcher = IPV4_PAT.exec(ip);
        let hex = "";
        let port;
        let ipOnly = [];
        try {

            if (ipv4Matcher && ipv4Matcher.length) {
                for (let i = 1; i <= 4; i++) {
                    ipOnly.push(ipv4Matcher[i]);
                    hex += toHex4(ipv4Matcher[i]);
                }
                if (ipv4Matcher[5]) {
                    port = parseInt(ipv4Matcher[5]);
                }
                return { ip: ipOnly.join("."), hex, port, version: 4 };
            }

            // IPV6 Must be colons format (a:b:c:d:e:A.B.C.D not currently supported)
            let ipv6Pattern = "^\\[{0,1}";
            for (let i = 1; i <= 7; i++) {
                ipv6Pattern += "([0-9a-f]+):";
            }
            ipv6Pattern += "([0-9a-f]+)(?:\\]:(\\d+)){0,1}$";
            const IPV6_PAT = new RegExp(ipv6Pattern);


            //  IPV6, double colon
            const ipv6DoubleColonMatcher = IPV6_DOUBLE_COL_PAT.exec(ip);
            if (ipv6DoubleColonMatcher && ipv6DoubleColonMatcher.length) {
                let p1 = ipv6DoubleColonMatcher[1];
                if (!p1) {
                    p1 = "0";
                }
                let p2 = ipv6DoubleColonMatcher[2];
                if (!p2) {
                    p2 = "0";
                }
                p1 = p1.padStart(4, "0");
                p2 = p2.padStart(4, "0");
                ip = p1 + getZeros(8 - numCount(p1) - numCount(p2)) + p2;
                if (ipv6DoubleColonMatcher[3]) {
                    ip = "[" + ip + "]:" + ipv6DoubleColonMatcher[3];
                }
            }

            //  IPV6
            const ipv6Matcher = IPV6_PAT.exec(ip);
            if (ipv6Matcher && ipv6Matcher.length) {
                for (let i = 1; i <= 8; i++) {
                    const p = toHex6(ipv6Matcher[i]).padStart(4, "0");
                    ipOnly.push(p);
                    hex += p;
                }
                if (ipv6Matcher[9]) {
                    port = parseInt(ipv6Matcher[9]);
                }
                return { ip: ipOnly.join(":"), hex, port, version: 6 };
            }

            throw new Error("Unknown address: " + ip);
        } catch (error) {
            return { ip, hex, port, version: null, error: error };
        }

        function numCount(/** @type {string} */s) {
            return s.split(":").length;
        }
        function getZeros(/** @type {number} */ count) {
            const sb = [":"];
            while (count > 0) {
                sb.push("0000:");
                count--;
            }
            return sb.join("");
        }
        function toHex4(/** @type {string} */ s) {
            const val = parseInt(s);
            if (val < 0 || val > 255) {
                throw new Error("Invalid value : " + s);
            }
            return val.toString(16).padStart(2, "0");
        }
        function toHex6(/** @type {string} */ s) {
            const val = parseInt(s, 16);
            if (val < 0 || val > 65536) {
                throw new Error("Invalid hex value : " + s);
            }
            return s;
        }
    }