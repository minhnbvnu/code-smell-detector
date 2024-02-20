function blink(state)
        {
            this.patBtns[patIdx].className = state? 'patsel_btn_queue':'patsel_btn';

            // Reschedule the blink function
            this.blinkTimer = setTimeout(evt => blink.call(this, !state), 200);
        }