function readPosition() {
                    var c = parts[i++];
                    if (!c) return;
                    if (c[0] == "c") {
                        var index = parseInt(c.slice(1)) || 0;
                        return editor.session.doc.indexToPosition(index);
                    }
                    var row = pos.row;
                    var column = 0;
                    if (/\d/.test(c)) {
                        row = parseInt(c) - 1;
                        c = parts[i++];
                    }
                    if (c == ":") {
                        c = parts[i++];
                        if (/\d/.test(c)) {
                            column = parseInt(c) || 0;
                        }
                    }
                    return {row: row, column: column};
                }