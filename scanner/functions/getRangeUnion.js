function getRangeUnion(declarations) {
                let pos = -1, end = -1;
                for (const node of declarations) {
                    pos = pos === -1 ? node.pos : node.pos === -1 ? pos : Math.min(pos, node.pos);
                    end = Math.max(end, node.end);
                }
                return createRange(pos, end);
            }