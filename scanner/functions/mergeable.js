function mergeable(head, tail) {
            return must_visit(head.start, head.end) || must_visit(head.start, tail.start);
        }