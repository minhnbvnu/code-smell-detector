function narrowTypeByTypeFacts(type, impliedType, facts) {
                    return mapType(type, (t) => (
                    // We first check if a constituent is a subtype of the implied type. If so, we either keep or eliminate
                    // the constituent based on its type facts. We use the strict subtype relation because it treats `object`
                    // as a subtype of `{}`, and we need the type facts check because function types are subtypes of `object`,
                    // but are classified as "function" according to `typeof`.
                    isTypeRelatedTo(t, impliedType, strictSubtypeRelation) ? getTypeFacts(t) & facts ? t : neverType : (
                    // We next check if the consituent is a supertype of the implied type. If so, we substitute the implied
                    // type. This handles top types like `unknown` and `{}`, and supertypes like `{ toString(): string }`.
                    isTypeSubtypeOf(impliedType, t) ? impliedType : (
                    // Neither the constituent nor the implied type is a subtype of the other, however their domains may still
                    // overlap. For example, an unconstrained type parameter and type `string`. If the type facts indicate
                    // possible overlap, we form an intersection. Otherwise, we eliminate the constituent.
                    getTypeFacts(t) & facts ? getIntersectionType([t, impliedType]) : neverType))));
                }