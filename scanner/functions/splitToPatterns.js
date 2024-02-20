function splitToPatterns(min, max, tok, options) {
        let ranges = splitToRanges(min, max);
        let tokens = [];
        let start = min;
        let prev;
        for (let i = 0; i < ranges.length; i++) {
            let max = ranges[i];
            let obj = rangeToPattern(String(start), String(max), options);
            let zeros = '';
            if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
                if (prev.count.length > 1) {
                    prev.count.pop();
                }
                prev.count.push(obj.count[0]);
                prev.string = prev.pattern + toQuantifier(prev.count);
                start = max + 1;
                continue;
            }
            if (tok.isPadded) {
                zeros = padZeros(max, tok, options);
            }
            obj.string = zeros + obj.pattern + toQuantifier(obj.count);
            tokens.push(obj);
            start = max + 1;
            prev = obj;
        }
        return tokens;
    }