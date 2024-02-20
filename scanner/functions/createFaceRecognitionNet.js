function createFaceRecognitionNet(weights) {
        var net = new FaceRecognitionNet();
        net.extractWeights(weights);
        return net;
    }