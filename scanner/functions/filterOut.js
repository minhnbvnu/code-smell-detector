function filterOut(button) {
        /**
        * TODO room for more tests
        */
        //filter out disabled, menu or similar numbers
        if (button.disabled || !commandIDs[button.id])
            return null;
        //return the ones which pass above tests
        return button;
    }