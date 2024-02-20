function has_multiple_if_returns(statements) {
                    var n = 0;
                    for (var i = statements.length; --i >= 0;) {
                        var stat = statements[i];
                        if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                            if (++n > 1)
                                return true;
                        }
                    }
                    return false;
                }