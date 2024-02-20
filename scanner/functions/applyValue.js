function applyValue(results, spec, val)
    {
        if (spec.long != null)
        results[spec.long] = val;
        if (spec.short != null)
        results[spec.short] = val;
    }