function set_moz_loc(mynode, moznode) {
                var start = mynode.start;
                var end = mynode.end;
                if (!(start && end)) {
                    return moznode;
                }
                if (start.pos != null && end.endpos != null) {
                    moznode.range = [start.pos, end.endpos];
                }
                if (start.line) {
                    moznode.loc = {
                        start: { line: start.line, column: start.col },
                        end: end.endline ? { line: end.endline, column: end.endcol } : null
                    };
                    if (start.file) {
                        moznode.loc.source = start.file;
                    }
                }
                return moznode;
            }