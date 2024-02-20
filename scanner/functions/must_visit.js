function must_visit(base, segment) {
            return base === segment || base.isPrototypeOf(segment);
        }