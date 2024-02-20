function getEventId() {
        if (counter == 65535) {
            counter = 1; // skip 0, it means non-transaction
        }
        return ++counter;
    }