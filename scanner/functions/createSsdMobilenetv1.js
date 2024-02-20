function createSsdMobilenetv1(weights) {
        var net = new SsdMobilenetv1();
        net.extractWeights(weights);
        return net;
    }