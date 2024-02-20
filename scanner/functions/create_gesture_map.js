function create_gesture_map() {
        return {
            pan: { tools: [], active: null },
            scroll: { tools: [], active: null },
            pinch: { tools: [], active: null },
            tap: { tools: [], active: null },
            doubletap: { tools: [], active: null },
            press: { tools: [], active: null },
            pressup: { tools: [], active: null },
            rotate: { tools: [], active: null },
            move: { tools: [], active: null },
            multi: { tools: [], active: null },
        };
    }