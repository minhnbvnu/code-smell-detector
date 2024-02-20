function startRAF() {
                if (!activeRAF && rafCallbacks.length > 0) {
                    activeRAF = raf.next(handleRAF);
                }
            }