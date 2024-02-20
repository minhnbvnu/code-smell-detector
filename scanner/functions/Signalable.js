function Signalable() {
        return class {
            connect(signal, slot) {
                return signal.connect(slot, this);
            }
            disconnect(signal, slot) {
                return signal.disconnect(slot, this);
            }
        };
    }