function UnselectAuto(calendar) {
            var _this = this;
            this.isRecentPointerDateSelect = false; // wish we could use a selector to detect date selection, but uses hit system
            this.onSelect = function (selectInfo) {
                if (selectInfo.jsEvent) {
                    _this.isRecentPointerDateSelect = true;
                }
            };
            this.onDocumentPointerUp = function (pev) {
                var _a = _this, calendar = _a.calendar, documentPointer = _a.documentPointer;
                var state = calendar.state;
                // touch-scrolling should never unfocus any type of selection
                if (!documentPointer.wasTouchScroll) {
                    if (state.dateSelection && // an existing date selection?
                        !_this.isRecentPointerDateSelect // a new pointer-initiated date selection since last onDocumentPointerUp?
                    ) {
                        var unselectAuto = calendar.viewOpt('unselectAuto');
                        var unselectCancel = calendar.viewOpt('unselectCancel');
                        if (unselectAuto && (!unselectAuto || !core.elementClosest(documentPointer.downEl, unselectCancel))) {
                            calendar.unselect(pev);
                        }
                    }
                    if (state.eventSelection && // an existing event selected?
                        !core.elementClosest(documentPointer.downEl, EventDragging.SELECTOR) // interaction DIDN'T start on an event
                    ) {
                        calendar.dispatch({ type: 'UNSELECT_EVENT' });
                    }
                }
                _this.isRecentPointerDateSelect = false;
            };
            this.calendar = calendar;
            var documentPointer = this.documentPointer = new PointerDragging(document);
            documentPointer.shouldIgnoreMove = true;
            documentPointer.shouldWatchScroll = false;
            documentPointer.emitter.on('pointerup', this.onDocumentPointerUp);
            /*
            TODO: better way to know about whether there was a selection with the pointer
            */
            calendar.on('select', this.onSelect);
        }