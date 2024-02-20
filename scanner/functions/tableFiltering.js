function tableFiltering(api, table_anchor, exclude_columns=[]) {
    // For each column
    api
        .columns()
        .eq(0)
        .each(function (colIdx) {
            // Set the header cell to contain the input element
            var cell = $('#'+table_anchor+' .filters th').eq(
                $(api.column(colIdx).header()).index()
            );

            if (exclude_columns.includes(colIdx)) {
                $(cell).html('<div class="form-group has-feedback" style="display: none;"><input type="text" class="form-control" placeholder="Filter"><i class="fas fa-times-circle form-control-feedback" onclick="removeFilter(this);"></i></div>');

                return;
            }

            $(cell).html('<div class="form-group has-feedback"><input type="text" class="form-control" placeholder="Filter"><i class="fas fa-times-circle form-control-feedback" onclick="removeFilter(this);"></i></div>');
            // On every keypress in this input
            $(
                'input',
                $('#'+table_anchor+' .filters th').eq($(api.column(colIdx).header()).index())
            )
                .off('keyup change')
                .on('keyup change', function (e) {
                    e.stopPropagation();
                    // Get the search value
                    $(this).attr('title', $(this).val());
                    var regexr = '({search})'; 
                    var cursorPosition = this.selectionStart;
                    // Search the column for that value
                    api
                        .column(colIdx)
                        .search(
                            this.value != ''
                                ? regexr.replace('{search}', '(((' + this.value + ')))')
                                : '',
                            this.value != '',
                            this.value == ''
                        )
                        .draw();
                    $(this)
                        .focus()[0]
                        .setSelectionRange(cursorPosition, cursorPosition);
                });
        });
}