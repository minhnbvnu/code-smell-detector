function incrementCount(elem, delta, delete_row) {
    //update the item count, if there is one
    if (elem) {
        var count = elem.find('div.count,span.count').first();
        var count_int = parseInt(count.html());

        if (!isNaN(count_int)) {
            count_int += delta;
            // don't let counts go below 0
            if (count_int < 0) {
                count_int = 0;
            }
            count.html(count_int);
            if (count_int === 0 && delete_row) {
                elem.remove();
            }
        }
    }
}