function as_name() {
                var tmp = S.token;
                if (tmp.type != "name" && tmp.type != "privatename")
                    unexpected();
                next();
                return tmp.value;
            }