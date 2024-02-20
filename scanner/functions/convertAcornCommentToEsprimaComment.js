function convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc, code) {
        let type;
        if (block) {
            type = "Block";
        }
        else if (code.slice(start, start + 2) === "#!") {
            type = "Hashbang";
        }
        else {
            type = "Line";
        }
        const comment = {
            type,
            value: text
        };
        if (typeof start === "number") {
            comment.start = start;
            comment.end = end;
            comment.range = [start, end];
        }
        if (typeof startLoc === "object") {
            comment.loc = {
                start: startLoc,
                end: endLoc
            };
        }
        return comment;
    }