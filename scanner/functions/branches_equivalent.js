function branches_equivalent(branch, prev, insertBreak) {
                let bbody = branch.body;
                let pbody = prev.body;
                if (insertBreak) {
                    bbody = bbody.concat(make_node(AST_Break));
                }
                if (bbody.length !== pbody.length)
                    return false;
                let bblock = make_node(AST_BlockStatement, branch, { body: bbody });
                let pblock = make_node(AST_BlockStatement, prev, { body: pbody });
                return bblock.equivalent_to(pblock);
            }