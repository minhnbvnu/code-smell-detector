function blockAndExecute() {
                blocked = true;
                setTimeout(unblock, minPeriod_ms);
                action();
            }