function onLayerLoad() {
            counter--;
            if (counter === 0) {
                done();
            }
        }