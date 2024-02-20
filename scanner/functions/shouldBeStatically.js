function shouldBeStatically(def) {
        return ((def.type === Variable.ClassName) ||
            (def.type === Variable.Variable && def.parent.kind !== "var"));
    }