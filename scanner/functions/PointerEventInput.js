function PointerEventInput() {
            this.evEl = POINTER_ELEMENT_EVENTS;
            this.evWin = POINTER_WINDOW_EVENTS;
            Input.apply(this, arguments);
            this.store = (this.manager.session.pointerEvents = []);
        }