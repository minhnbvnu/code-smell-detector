function endStream() {
            merging = false;
            // emit 'queueDrain' when all streams merged.
            mergedStream.emit('queueDrain');
            if (doEnd) {
                mergedStream.end();
            }
        }