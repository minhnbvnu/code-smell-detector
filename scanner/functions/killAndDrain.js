function killAndDrain() {
            queueHead = null;
            queueTail = null;
            self.drain();
            self.drain = noop;
        }