function checkReset() {
            if (state >= pieces.length) {
                output.push(collector);
                reset();
            }
        }