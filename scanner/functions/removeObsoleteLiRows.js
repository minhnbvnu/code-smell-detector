function removeObsoleteLiRows(selector, index, amount) {
    selector.filter(function() {
        var row = $(this).data('row');

        if(row !== 'undefined') {
            return (row >= index) && (row < index + amount);
        }

        return false;
    }).each(function() {
        $(this).remove();
    });
}