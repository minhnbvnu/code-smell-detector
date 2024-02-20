function computeEventDraggable(context, eventDef, eventUi) {
        var calendar = context.calendar, view = context.view;
        var transformers = calendar.pluginSystem.hooks.isDraggableTransformers;
        var val = eventUi.startEditable;
        for (var _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
            var transformer = transformers_1[_i];
            val = transformer(val, eventDef, eventUi, view);
        }
        return val;
    }