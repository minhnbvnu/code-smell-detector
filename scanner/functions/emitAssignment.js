function emitAssignment(left, right, location) {
                emitWorker(2 /* Assign */, [left, right], location);
            }