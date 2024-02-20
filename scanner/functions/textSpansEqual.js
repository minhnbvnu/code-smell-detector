function textSpansEqual(a, b) {
            return !!a && !!b && a.start === b.start && a.length === b.length;
        }