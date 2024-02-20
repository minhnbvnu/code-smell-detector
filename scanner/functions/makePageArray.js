function makePageArray(pageAt, pageNum, showPagingNavNum) {
        var array = [];
        var start;
        var end;
        if (pageNum <= showPagingNavNum) { // 全部显示
            start = 1;
            end = pageNum + 1; // 因为不包括end
        } else {
            if (pageAt - parseInt(showPagingNavNum / 2, 10) <= 0) {
                start = 1;
            } else if (pageAt + parseInt(showPagingNavNum / 2, 10) > pageNum) {
                start = pageNum - showPagingNavNum + 1;
            } else {
                start = pageAt - parseInt(showPagingNavNum / 2, 10);
            }
            end = start + showPagingNavNum;
            if (end >= pageNum + 1) {
                end = pageNum + 1;
            }
        }

        for (var i = start; i < end; i++) {
            array.push(template.normal.replace(/{index}/g, i));
        }
        return array;
    }