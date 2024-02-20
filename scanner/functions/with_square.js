function with_square(cont) {
                print("[");
                //var ret = with_indent(current_col, cont);
                var ret = cont();
                print("]");
                return ret;
            }