function unblock() {
                if (queued) {
                    dequeue();
                    blockAndExecute();
                }
                else {
                    blocked = false;
                }
            }