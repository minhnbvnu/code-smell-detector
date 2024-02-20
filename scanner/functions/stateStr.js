function stateStr(state) {
            if (state & STATE_CANCELLED) {
                return 'cancel';
            }
            else if (state & STATE_ENDED) {
                return 'end';
            }
            else if (state & STATE_CHANGED) {
                return 'move';
            }
            else if (state & STATE_BEGAN) {
                return 'start';
            }
            return '';
        }