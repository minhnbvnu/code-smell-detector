function killEventImmediately(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }