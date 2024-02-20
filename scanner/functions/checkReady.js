function checkReady() {
            if (swf.write) {
                checkBuffer();
            } else {
                setTimeout(checkReady, 10);
            }
        }