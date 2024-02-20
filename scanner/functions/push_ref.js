function push_ref(def, ref) {
            def.references.push(ref);
            if (def.last_ref !== false) def.last_ref = ref;
        }