function highlight_line(line) {
    var line_el = $('tr.file_line[data-position="' + Number(line[0]) + '"]');
    if (line_el.length == 1) {
        var me = line_el.find('td.add_highlight');
        me
        .css({
            'background-image': "url('/css/images/ui-icons_70b2e1_256x240.png')"})
        .attr('data-highlighted', 1)
        .attr('title', "Highlighted by " + line[1]);
    }
}