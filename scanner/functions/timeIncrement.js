function timeIncrement(e) {
            var eventTarget = (0, dom_1.getEventTarget)(e);
            if (~eventTarget.className.indexOf("arrow"))
                incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
        }