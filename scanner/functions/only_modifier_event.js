function only_modifier_event (event) {
        // adapted from base/js/keyboard
        /**
         * Return `true` if the event only contains modifiers keys, false
         * otherwise
         */
        var key = keyboard.inv_keycodes[event.which];
        return ((event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) &&
            (key === 'alt'|| key === 'ctrl'|| key === 'meta'|| key === 'shift'));
    }