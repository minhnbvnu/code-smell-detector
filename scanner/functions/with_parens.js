function with_parens(cont) {
                print("(");
                //XXX: still nice to have that for argument lists
                //var ret = with_indent(current_col, cont);
                var ret = cont();
                print(")");
                return ret;
            }