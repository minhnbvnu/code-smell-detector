function format_object(obj) {
                var lines = [];
                var padding = "";
                Object.keys(obj).map(function (name) {
                    if (padding.length < name.length)
                        padding = Array(name.length + 1).join(" ");
                    return [name, JSON.stringify(obj[name])];
                }).forEach(function (tokens) {
                    lines.push("  " + tokens[0] + padding.slice(tokens[0].length - 2) + tokens[1]);
                });
                return lines.join("\n");
            }