function compareEmitHelpers(x, y) {
            if (x === y)
                return 0 /* EqualTo */;
            if (x.priority === y.priority)
                return 0 /* EqualTo */;
            if (x.priority === void 0)
                return 1 /* GreaterThan */;
            if (y.priority === void 0)
                return -1 /* LessThan */;
            return compareValues(x.priority, y.priority);
        }