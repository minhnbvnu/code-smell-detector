function def_to_moz(mytype, handler) {
                mytype.DEFMETHOD("to_mozilla_ast", function (parent) {
                    return set_moz_loc(this, handler(this, parent));
                });
            }