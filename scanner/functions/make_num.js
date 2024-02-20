function make_num(num) {
                var str = num.toString(10).replace(/^0\./, ".").replace("e+", "e");
                var candidates = [str];
                if (Math.floor(num) === num) {
                    if (num < 0) {
                        candidates.push("-0x" + (-num).toString(16).toLowerCase());
                    }
                    else {
                        candidates.push("0x" + num.toString(16).toLowerCase());
                    }
                }
                var match, len, digits;
                if (match = /^\.0+/.exec(str)) {
                    len = match[0].length;
                    digits = str.slice(len);
                    candidates.push(digits + "e-" + (digits.length + len - 1));
                }
                else if (match = /0+$/.exec(str)) {
                    len = match[0].length;
                    candidates.push(str.slice(0, -len) + "e" + len);
                }
                else if (match = /^(\d)\.(\d+)e(-?\d+)$/.exec(str)) {
                    candidates.push(match[1] + match[2] + "e" + (match[3] - match[2].length));
                }
                return best_of(candidates);
            }