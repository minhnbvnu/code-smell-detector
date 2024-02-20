function bpnn_create(n_in, n_hidden, n_out) {
    var newnet;

    newnet = new bpnn_internal_create(n_in, n_hidden, n_out);

    bpnn_randomize_array(newnet.input_weights, n_in, n_hidden);
    bpnn_randomize_array(newnet.hidden_weights, n_hidden, n_out);
    bpnn_randomize_row(newnet.target, n_out);

    // Load input image with random values
    loadInput(newnet.input_units, n_in, 1);

    return newnet;
}