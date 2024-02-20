function removeDotSegments(input) {
            var output = [];
            while (input.length) {
                if (input.match(RDS1)) {
                    input = input.replace(RDS1, "");
                }
                else if (input.match(RDS2)) {
                    input = input.replace(RDS2, "/");
                }
                else if (input.match(RDS3)) {
                    input = input.replace(RDS3, "/");
                    output.pop();
                }
                else if (input === "." || input === "..") {
                    input = "";
                }
                else {
                    var im = input.match(RDS5);
                    if (im) {
                        var s = im[0];
                        input = input.slice(s.length);
                        output.push(s);
                    }
                    else {
                        throw new Error("Unexpected dot segment condition");
                    }
                }
            }
            return output.join("");
        }