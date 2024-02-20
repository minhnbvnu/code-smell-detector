function createTinyFaceDetector(weights) {
        var net = new TinyFaceDetector();
        net.extractWeights(weights);
        return net;
    }