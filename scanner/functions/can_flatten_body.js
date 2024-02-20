function can_flatten_body(stat) {
                var body = fn.body;
                var len = body.length;
                if (compressor.option("inline") < 3) {
                    return len == 1 && return_value(stat);
                }
                stat = null;
                for (var i = 0; i < len; i++) {
                    var line = body[i];
                    if (line instanceof AST_Var) {
                        if (stat && !line.definitions.every((var_def) => !var_def.value)) {
                            return false;
                        }
                    }
                    else if (stat) {
                        return false;
                    }
                    else if (!(line instanceof AST_EmptyStatement)) {
                        stat = line;
                    }
                }
                return return_value(stat);
            }