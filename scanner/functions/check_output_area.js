function check_output_area(output_type, keys) {
    this.wait_for_output(0);
    var json = this.evaluate(function() {
        var json = IPython.notebook.get_cell(0).output_area.toJSON();
        // appended cell will initially be empty, let's add some output
        IPython.notebook.get_cell(1).output_area.fromJSON(json);
        return json;
    });
    // The evaluate call above happens asynchronously: wait for cell[1] to have output
    this.wait_for_output(1);
    var result = this.get_output_cell(0);
    var result2 = this.get_output_cell(1);
    this.test.assertEquals(result.output_type, output_type,
        'testing ' + output_type + ' for ' + keys.join(' and '));

    for (var idx in keys) {
        assert_has.apply(this, [keys[idx], json, result, result2]);
    }
}