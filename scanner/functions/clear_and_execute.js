function clear_and_execute(that, code) {
    that.evaluate(function() {
        IPython.notebook.get_cell(0).clear_output();
        IPython.notebook.get_cell(1).clear_output();
    });
    that.then(function () {
        that.set_cell_text(0, code);
        that.execute_cell(0);
        that.wait_for_idle();
    });
}