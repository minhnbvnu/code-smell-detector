function endUpdate() {
            var wasBulkSuspend = isBulkSuspend;
            isBulkSuspend = false;
            suspend = false;
            if (wasBulkSuspend) {
                processBulkDelete();
                ensureIdUniqueness();
            }
            refresh();
        }