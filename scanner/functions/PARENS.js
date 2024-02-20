function PARENS(nodetype, func) {
                if (Array.isArray(nodetype)) {
                    nodetype.forEach(function (nodetype) {
                        PARENS(nodetype, func);
                    });
                }
                else {
                    nodetype.DEFMETHOD("needs_parens", func);
                }
            }