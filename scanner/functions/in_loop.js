function in_loop(cont) {
                ++S.in_loop;
                var ret = cont();
                --S.in_loop;
                return ret;
            }