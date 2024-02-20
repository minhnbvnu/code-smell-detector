function isTupleTypeStructureMatching(t1, t2) {
                return getTypeReferenceArity(t1) === getTypeReferenceArity(t2) && every(t1.target.elementFlags, (f, i) => (f & 12 /* Variable */) === (t2.target.elementFlags[i] & 12 /* Variable */));
            }