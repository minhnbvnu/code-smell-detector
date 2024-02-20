function backprop_face(layer_size) {
    var net;
    var out_err, hid_err;
    var time0, time1;
    var expected_layer_size = 2850000;
    var expected_sum_of_hidden_weights = 10.855641469359398;
    var eps = 0.00001;
    net = bpnn_create(layer_size, 16, 1); // (16, 1 can not be changed)
    //entering the training kernel, only one iteration
    time0 = performance.now();
    bpnn_train_kernel(net);
    time1 = performance.now();

    if (layer_size === expected_layer_size) {
        var sum_of_hidden_weights = 0;
        for (var i = 1; i <= net.hidden_n; ++i) {
            for (var j = 1; j <= net.output_n; ++j) {
                sum_of_hidden_weights += net.hidden_weights[i * (net.output_n + 1) + j];
            }
        }
        if (!(expected_sum_of_hidden_weights - eps < sum_of_hidden_weights &&
            sum_of_hidden_weights < expected_sum_of_hidden_weights + eps)) {
            throw new Error("ERROR: expected a sum of hidden weights of '" + expected_sum_of_hidden_weights + "'" +
                " for an input size of '" + expected_layer_size + "'" +
                " but got '" + sum_of_hidden_weights + "' instead");
        }
    } else {
        console.log("WARNING: no self-checking for input size of '" + layer_size + "'");
    }

    //console.log("Output: " + net.output_units[1].toFixed(4) + "\t" + net.output_delta[1].toFixed(4));
    net = null;
    console.log("Computation time: " + (time1 - time0) / 1000 + " s\n");
    return {
        status: 1,
        options: "runBackProp(" + layer_size + ")",
        time: (time1 - time0) / 1000
    };
}