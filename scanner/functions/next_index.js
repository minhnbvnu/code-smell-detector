function next_index(i) {
                    for (var j = i + 1, len = statements.length; j < len; j++) {
                        var stat = statements[j];
                        if (!(stat instanceof AST_Var && declarations_only(stat))) {
                            break;
                        }
                    }
                    return j;
                }