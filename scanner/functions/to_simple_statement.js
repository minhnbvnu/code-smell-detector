function to_simple_statement(block, decls) {
                if (!(block instanceof AST_BlockStatement))
                    return block;
                var stat = null;
                for (var i = 0, len = block.body.length; i < len; i++) {
                    var line = block.body[i];
                    if (line instanceof AST_Var && declarations_only(line)) {
                        decls.push(line);
                    }
                    else if (stat || line instanceof AST_Const || line instanceof AST_Let) {
                        return false;
                    }
                    else {
                        stat = line;
                    }
                }
                return stat;
            }