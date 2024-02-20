function getLinkRenderer() {
    return function(instance, td, row, col, prop, value, cellProperties) {
        cellProperties.readOnly = true;
        var escaped = Handsontable.helper.stringify(value);

        if (escaped && escaped.length !== 0) {
            var $img = $('<a style="display:block; margin: 0 auto;" target="_blank" href="' + escaped + '">');
            $img.addClass("ui-icon ui-icon-tag");
            $img.attr('title', escaped);
            $img.on('mousedown', function(event) {
                event.preventDefault(); //prevent selection quirk
            });
            $(td).empty().append($img); //empty is needed because you are rendering to an existing cell
        }
        else {
            Handsontable.TextRenderer.apply(this, arguments); //render as text
        }
        return td;
    };
}