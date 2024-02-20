function isTypeEqualityComparableTo(source, target) {
                return (target.flags & 98304 /* Nullable */) !== 0 || isTypeComparableTo(source, target);
            }