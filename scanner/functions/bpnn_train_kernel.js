function bpnn_train_kernel(net) {
    var inp, hid, out;
    var out_err, hid_err;

    inp = net.input_n;
    hid = net.hidden_n;
    out = net.output_n;

    bpnn_layerforward(net.input_units, net.hidden_units, net.input_weights, inp, hid);
    bpnn_layerforward(net.hidden_units, net.output_units, net.hidden_weights, hid, out);

    out_err = bpnn_output_error(net.output_delta, net.target, net.output_units, out);
    hid_err = bpnn_hidden_error(net.hidden_delta, hid, net.output_delta, out, net.hidden_weights, net.hidden_units);

    bpnn_adjust_weights(net.output_delta, out, net.hidden_units, hid, net.hidden_weights, net.hidden_prev_weights);
    console.log("1");
    bpnn_adjust_weights(net.hidden_delta, hid, net.input_units, inp, net.input_weights, net.input_prev_weights);
    console.log("2");
}