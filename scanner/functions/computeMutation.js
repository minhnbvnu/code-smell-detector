function computeMutation(hit0, hit1, isFromStart, instanceRange, transforms) {
        var dateEnv = hit0.component.context.dateEnv;
        var date0 = hit0.dateSpan.range.start;
        var date1 = hit1.dateSpan.range.start;
        var delta = core.diffDates(date0, date1, dateEnv, hit0.component.largeUnit);
        var props = {};
        for (var _i = 0, transforms_1 = transforms; _i < transforms_1.length; _i++) {
            var transform = transforms_1[_i];
            var res = transform(hit0, hit1);
            if (res === false) {
                return null;
            }
            else if (res) {
                __assign(props, res);
            }
        }
        if (isFromStart) {
            if (dateEnv.add(instanceRange.start, delta) < instanceRange.end) {
                props.startDelta = delta;
                return props;
            }
        }
        else {
            if (dateEnv.add(instanceRange.end, delta) > instanceRange.start) {
                props.endDelta = delta;
                return props;
            }
        }
        return null;
    }