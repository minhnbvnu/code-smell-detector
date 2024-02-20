function filterSegsViaEls(context, segs, isMirror) {
        var calendar = context.calendar, view = context.view;
        if (calendar.hasPublicHandlers('eventRender')) {
            segs = segs.filter(function (seg) {
                var custom = calendar.publiclyTrigger('eventRender', [
                    {
                        event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                        isMirror: isMirror,
                        isStart: seg.isStart,
                        isEnd: seg.isEnd,
                        // TODO: include seg.range once all components consistently generate it
                        el: seg.el,
                        view: view
                    }
                ]);
                if (custom === false) { // means don't render at all
                    return false;
                }
                else if (custom && custom !== true) {
                    seg.el = custom;
                }
                return true;
            });
        }
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            setElSeg(seg.el, seg);
        }
        return segs;
    }