function append_inline_comment(data) {
    var line_el = $('tr.file_line[data-position="' + (Number(data.line) + 1) + '"]');
    if (line_el.length < 1) {
        var line_el = $('table.line_table tr.inline_comment:last');
        if (line_el.length < 1) {
            var line_el = $('tr.file_line[data-position="' + data.line + '"]');
        }
        line_el.after(data.html);
    } else {
        line_el.before(data.html);
    }
}