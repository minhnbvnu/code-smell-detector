function incrementNumInput(e, delta, inputElem) {
            var target = e && (0, dom_1.getEventTarget)(e);
            var input = inputElem ||
                (target && target.parentNode && target.parentNode.firstChild);
            var event = createEvent("increment");
            event.delta = delta;
            input && input.dispatchEvent(event);
        }