function hideElement (el) {
        if (! el) {
            return;
        }

        var removeThis = function() {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };

        removeClass(el, "show");
        addClass(el, "hide");
        el.addEventListener("transitionend", removeThis);

        // Fallback for no transitions.
        setTimeout(removeThis, TRANSITION_FALLBACK_DURATION);
    }