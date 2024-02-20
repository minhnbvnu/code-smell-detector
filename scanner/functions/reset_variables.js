function reset_variables(tw, compressor, node) {
            node.variables.forEach(function (def) {
                reset_def(compressor, def);
                if (def.fixed === null) {
                    tw.defs_to_safe_ids.set(def.id, tw.safe_ids);
                    mark(tw, def, true);
                }
                else if (def.fixed) {
                    tw.loop_ids.set(def.id, tw.in_loop);
                    mark(tw, def, true);
                }
            });
        }