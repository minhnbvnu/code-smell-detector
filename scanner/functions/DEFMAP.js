function DEFMAP(nodetype, generator) {
                nodetype.forEach(function (nodetype) {
                    nodetype.DEFMETHOD("add_source_map", generator);
                });
            }