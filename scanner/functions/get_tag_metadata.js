function get_tag_metadata () {
        return casper.evaluate(function () {
            return Jupyter.notebook.get_cell(0).metadata.tags;
        });
    }