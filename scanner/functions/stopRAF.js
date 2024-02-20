function stopRAF() {
                if (activeRAF) {
                    raf.cancel(handleRAF);
                    activeRAF = null;
                }
            }