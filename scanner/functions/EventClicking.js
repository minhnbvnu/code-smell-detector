function EventClicking(settings) {
            var _this = _super.call(this, settings) || this;
            _this.handleSegClick = function (ev, segEl) {
                var component = _this.component;
                var _a = component.context, calendar = _a.calendar, view = _a.view;
                var seg = getElSeg(segEl);
                if (seg && // might be the <div> surrounding the more link
                    component.isValidSegDownEl(ev.target)) {
                    // our way to simulate a link click for elements that can't be <a> tags
                    // grab before trigger fired in case trigger trashes DOM thru rerendering
                    var hasUrlContainer = elementClosest(ev.target, '.fc-has-url');
                    var url = hasUrlContainer ? hasUrlContainer.querySelector('a[href]').href : '';
                    calendar.publiclyTrigger('eventClick', [
                        {
                            el: segEl,
                            event: new EventApi(component.context.calendar, seg.eventRange.def, seg.eventRange.instance),
                            jsEvent: ev,
                            view: view
                        }
                    ]);
                    if (url && !ev.defaultPrevented) {
                        window.location.href = url;
                    }
                }
            };
            var component = settings.component;
            _this.destroy = listenBySelector(component.el, 'click', component.fgSegSelector + ',' + component.bgSegSelector, _this.handleSegClick);
            return _this;
        }