function semicolon(optional) {
                if (is("punc", ";"))
                    next();
                else if (!optional && !can_insert_semicolon())
                    unexpected();
            }