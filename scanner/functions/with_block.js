function with_block(cont) {
                var ret;
                print("{");
                newline();
                with_indent(next_indent(), function () {
                    ret = cont();
                });
                indent();
                print("}");
                return ret;
            }