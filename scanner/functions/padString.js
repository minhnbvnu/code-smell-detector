function padString(n, string) {
            if (typeof string !== "string") {
                return ""
            }
            return string.split("\n").map(function(line, i) {
                return i > 0 ? Array(n + 1).join(" ") + line : line
            }).join("\n")
        }