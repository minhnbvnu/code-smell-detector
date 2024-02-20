function computeEventStartResizable(context, eventDef, eventUi) {
        return eventUi.durationEditable && context.options.eventResizableFromStart;
    }