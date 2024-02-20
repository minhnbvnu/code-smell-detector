function idle() {
            return _running === 0 && self.length() === 0;
        }