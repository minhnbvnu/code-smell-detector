function prev_index(i) {
                    for (var j = i; --j >= 0;) {
                        var stat = statements[j];
                        if (!(stat instanceof AST_Var && declarations_only(stat))) {
                            break;
                        }
                    }
                    return j;
                }