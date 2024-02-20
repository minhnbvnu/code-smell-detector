function bpnn_internal_create(n_in, n_hidden, n_out) {
    //var newnet = Object.create(BPNN);

    this.input_n = n_in;
    this.hidden_n = n_hidden;
    this.output_n = n_out;
    this.input_units = new Float64Array(n_in + 1);
    this.hidden_units = new Float64Array(n_hidden + 1);
    this.output_units = new Float64Array(n_out + 1);

    this.hidden_delta = new Float64Array(n_hidden + 1);
    this.output_delta = new Float64Array(n_out + 1);
    this.target = new Float64Array(n_out + 1);

    this.input_weights = new Float64Array((n_in + 1) * (n_hidden + 1)); // TA
    this.hidden_weights = new Float64Array((n_hidden + 1) * (1 + n_out)); // TA

    this.input_prev_weights = new Float64Array((n_in + 1) * (1 + n_hidden));
    this.hidden_prev_weights = new Float64Array((n_hidden + 1) * (1 + n_out)); // TA

    return this;
}