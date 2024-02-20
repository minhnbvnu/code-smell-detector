function computeRes() {
            start = date.clone().startOf(alignment);
            end = start.clone().add(duration);
            res = new UnzonedRange_1.default(start, end);
        }