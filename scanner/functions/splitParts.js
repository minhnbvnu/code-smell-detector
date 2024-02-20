function splitParts(str) {
            if (str.length === 0) {
                return [];
            }
            var firstChar = str.charAt(0);
            var lastChar = str.charAt(str.length - 1);
            if (str.length > 1 &&
                firstChar === lastChar &&
                (firstChar === '"' || firstChar === "'")) {
                return ['"' + escapeStr(str.substr(1, str.length - 2)) + '"'];
            }
            var parts = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(str);
            if (parts) {
                return (splitParts(str.substr(0, parts.index))
                    .concat(splitParts(parts[1]))
                    .concat(splitParts(str.substr(parts.index + parts[0].length))));
            }
            var subparts = str.split('.');
            if (subparts.length === 1) {
                return ['"' + escapeStr(str) + '"'];
            }
            var result = [];
            for (var i = 0; i < subparts.length; ++i) {
                result = result.concat(splitParts(subparts[i]));
            }
            return result;
        }