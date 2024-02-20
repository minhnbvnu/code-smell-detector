function ExternalElementDragging(dragging, suppliedDragMeta) {
            var _this = this;
            this.receivingCalendar = null;
            this.droppableEvent = null; // will exist for all drags, even if create:false
            this.suppliedDragMeta = null;
            this.dragMeta = null;
            this.handleDragStart = function (ev) {
                _this.dragMeta = _this.buildDragMeta(ev.subjectEl);
            };
            this.handleHitUpdate = function (hit, isFinal, ev) {
                var dragging = _this.hitDragging.dragging;
                var receivingCalendar = null;
                var droppableEvent = null;
                var isInvalid = false;
                var interaction = {
                    affectedEvents: core.createEmptyEventStore(),
                    mutatedEvents: core.createEmptyEventStore(),
                    isEvent: _this.dragMeta.create,
                    origSeg: null
                };
                if (hit) {
                    receivingCalendar = hit.component.context.calendar;
                    if (_this.canDropElOnCalendar(ev.subjectEl, receivingCalendar)) {
                        droppableEvent = computeEventForDateSpan(hit.dateSpan, _this.dragMeta, receivingCalendar);
                        interaction.mutatedEvents = core.eventTupleToStore(droppableEvent);
                        isInvalid = !core.isInteractionValid(interaction, receivingCalendar);
                        if (isInvalid) {
                            interaction.mutatedEvents = core.createEmptyEventStore();
                            droppableEvent = null;
                        }
                    }
                }
                _this.displayDrag(receivingCalendar, interaction);
                // show mirror if no already-rendered mirror element OR if we are shutting down the mirror (?)
                // TODO: wish we could somehow wait for dispatch to guarantee render
                dragging.setMirrorIsVisible(isFinal || !droppableEvent || !document.querySelector('.fc-mirror'));
                if (!isInvalid) {
                    core.enableCursor();
                }
                else {
                    core.disableCursor();
                }
                if (!isFinal) {
                    dragging.setMirrorNeedsRevert(!droppableEvent);
                    _this.receivingCalendar = receivingCalendar;
                    _this.droppableEvent = droppableEvent;
                }
            };
            this.handleDragEnd = function (pev) {
                var _a = _this, receivingCalendar = _a.receivingCalendar, droppableEvent = _a.droppableEvent;
                _this.clearDrag();
                if (receivingCalendar && droppableEvent) {
                    var finalHit = _this.hitDragging.finalHit;
                    var finalView = finalHit.component.context.view;
                    var dragMeta = _this.dragMeta;
                    var arg = __assign({}, receivingCalendar.buildDatePointApi(finalHit.dateSpan), { draggedEl: pev.subjectEl, jsEvent: pev.origEvent, view: finalView });
                    receivingCalendar.publiclyTrigger('drop', [arg]);
                    if (dragMeta.create) {
                        receivingCalendar.dispatch({
                            type: 'MERGE_EVENTS',
                            eventStore: core.eventTupleToStore(droppableEvent)
                        });
                        if (pev.isTouch) {
                            receivingCalendar.dispatch({
                                type: 'SELECT_EVENT',
                                eventInstanceId: droppableEvent.instance.instanceId
                            });
                        }
                        // signal that an external event landed
                        receivingCalendar.publiclyTrigger('eventReceive', [
                            {
                                draggedEl: pev.subjectEl,
                                event: new core.EventApi(receivingCalendar, droppableEvent.def, droppableEvent.instance),
                                view: finalView
                            }
                        ]);
                    }
                }
                _this.receivingCalendar = null;
                _this.droppableEvent = null;
            };
            var hitDragging = this.hitDragging = new HitDragging(dragging, core.interactionSettingsStore);
            hitDragging.requireInitial = false; // will start outside of a component
            hitDragging.emitter.on('dragstart', this.handleDragStart);
            hitDragging.emitter.on('hitupdate', this.handleHitUpdate);
            hitDragging.emitter.on('dragend', this.handleDragEnd);
            this.suppliedDragMeta = suppliedDragMeta;
        }