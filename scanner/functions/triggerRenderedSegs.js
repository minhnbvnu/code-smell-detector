function triggerRenderedSegs(context, segs, isMirrors) {
        var calendar = context.calendar, view = context.view;
        if (calendar.hasPublicHandlers('eventPositioned')) {
            for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
                var seg = segs_2[_i];
                calendar.publiclyTriggerAfterSizing('eventPositioned', [
                    {
                        event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                        isMirror: isMirrors,
                        isStart: seg.isStart,
                        isEnd: seg.isEnd,
                        el: seg.el,
                        view: view
                    }
                ]);
            }
        }
        if (!calendar.state.eventSourceLoadingLevel) { // avoid initial empty state while pending
            calendar.afterSizingTriggers._eventsPositioned = [null]; // fire once
        }
    }