function eatComment(singleLine) {
            var start = pos;
            next();
            while (next()) {
                if (ch === "*" && peek() === "/") {
                    pos++;
                    break;
                } else if (singleLine && ch === "\n") {
                    break;
                }
            }

            return source_text.substring(start, pos + 1);
        }