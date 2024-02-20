function isPropertyReadonlyInType(type, name, checker) {
        let seenProperty = false;
        let seenReadonlySignature = false;
        for (const t of unionTypeParts(type)) {
            if (getPropertyOfType(t, name) === undefined) {
                // property is not present in this part of the union -> check for readonly index signature
                const index = (util_1.isNumericPropertyName(name) ? checker.getIndexInfoOfType(t, ts.IndexKind.Number) : undefined) ||
                    checker.getIndexInfoOfType(t, ts.IndexKind.String);
                if (index !== undefined && index.isReadonly) {
                    if (seenProperty)
                        return true;
                    seenReadonlySignature = true;
                }
            }
            else if (seenReadonlySignature || isReadonlyPropertyIntersection(t, name, checker)) {
                return true;
            }
            else {
                seenProperty = true;
            }
        }
        return false;
    }