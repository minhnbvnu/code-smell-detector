function get_tag_elements () {
        return casper.evaluate(function () {
            var cell = Jupyter.notebook.get_cell(0);
            return $.map(
                cell.element.find('.cell-tag'),
                function (el) {
                    return $(el.childNodes[0]).text();
                }
            );
        })
    }