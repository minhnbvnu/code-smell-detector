function ref_once(tw, compressor, def) {
            return compressor.option("unused")
                && !def.scope.pinned()
                && def.references.length - def.recursive_refs == 1
                && tw.loop_ids.get(def.id) === tw.in_loop;
        }