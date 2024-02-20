function groupFileDone() {
            if (--filesLeft === 0) {
                groupEnd();
            }
        }