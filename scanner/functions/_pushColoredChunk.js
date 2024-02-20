function _pushColoredChunk(chunk, fg, bg, bold, underline, inverse, out) {
        if (chunk) {
            var classes = [];
            var styles = [];

            if (bold && typeof fg === "number" && 0 <= fg && fg < 8) {
                fg += 8;  // Bold text uses "intense" colors
            }
            if (inverse) {
                [fg, bg] = [bg, fg];
            }

            if (typeof fg === "number") {
                classes.push(_ANSI_COLORS[fg] + "-fg");
            } else if (fg.length) {
                styles.push("color: rgb(" + fg + ")");
            } else if (inverse) {
                classes.push("ansi-default-inverse-fg");
            }

            if (typeof bg === "number") {
                classes.push(_ANSI_COLORS[bg] + "-bg");
            } else if (bg.length) {
                styles.push("background-color: rgb(" + bg + ")");
            } else if (inverse) {
                classes.push("ansi-default-inverse-bg");
            }

            if (bold) {
                classes.push("ansi-bold");
            }

            if (underline) {
                classes.push("ansi-underline");
            }

            if (classes.length || styles.length) {
                out.push("<span");
                if (classes.length) {
                    out.push(' class="' + classes.join(" ") + '"');
                }
                if (styles.length) {
                    out.push(' style="' + styles.join("; ") + '"');
                }
                out.push(">");
                out.push(chunk);
                out.push("</span>");
            } else {
                out.push(chunk);
            }
        }
    }