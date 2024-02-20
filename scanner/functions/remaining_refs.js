function remaining_refs(def) {
                return def.references.length - def.replaced - (assignments[def.name] || 0);
            }