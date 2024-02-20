function cancelOnTransitionEnd(ev) {
            if (ev.target !== this) return;
            cancelTransition();
          }