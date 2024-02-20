function read_while(pred) {
                var ret = "", ch, i = 0;
                while ((ch = peek()) && pred(ch, i++))
                    ret += next();
                return ret;
            }