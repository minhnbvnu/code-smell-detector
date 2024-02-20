function getTimeToNextFrame() {
            return 16 - ((clock.now - start) % 16);
        }