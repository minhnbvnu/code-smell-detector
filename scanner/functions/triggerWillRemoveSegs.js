function triggerWillRemoveSegs(context, segs, isMirrors) {
        var calendar = context.calendar, view = context.view;
        for (var _i = 0, segs_3 = segs; _i < segs_3.length; _i++) {
            var seg = segs_3[_i];
            calendar.trigger('eventElRemove', seg.el);
        }
        if (calendar.hasPublicHandlers('eventDestroy')) {
            for (var _a = 0, segs_4 = segs; _a < segs_4.length; _a++) {
                var seg = segs_4[_a];
                calendar.publiclyTrigger('eventDestroy', [
                    {
                        event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                        isMirror: isMirrors,
                        el: seg.el,
                        view: view
                    }
                ]);
            }
        }
    }