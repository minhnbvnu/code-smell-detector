function createMtcnn(weights) {
        var net = new Mtcnn();
        net.extractWeights(weights);
        return net;
    }