function on_keyboard_event_closure(name) {
        return function (event) {
            return fig.key_event(event, name);
        };
    }