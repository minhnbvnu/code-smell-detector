function renderpager(pagenumber, pagecount, pageSize, recordCount, customerText, buttonClickCallback) {
        var $pager = "";
        $pager += "<div class=\"span6\">";
        $pager += "<div class=\"dataTables_info\"></div>";
        $pager += "</div>";

        $pager += "<div class=\"span6\">";
        $pager += "<div class=\"dataTables_paginate paging_bootstrap pagination\">";
        $pager += "<ul class='pager_items'>";

        if (pagenumber <= 1) {
            $pager += "<li class=\"prev disabled\" data=\"1\"><a href=\"javascript:void(0)\">首页</a></li>";
        } else {
            $pager += "<li class=\"prev\" data=\"1\"><a href=\"javascript:void(0)\">首页</a></li>";
        }

        var start = pagenumber - 3;
        start = start <= 1 ? 1 : start;
        if (start > 1) {
            $pager += "<li data=\"0\"><a href=\"javascript:void(0)\">...</a></li>";
        }
        for (var i = start; i < pagenumber; i++) {
            $pager += "<li data=\"" + i + "\"><a href=\"javascript:void(0)\">" + i + "</a></li>";
        }
        $pager += "<li class=\"active\" data=\"" + pagenumber + "\"><a href=\"javascript:void(0)\">" + pagenumber + "</a></li>";

        var end = pagenumber + 3;
        end = end >= pagecount ? pagecount : end;

        for (var i = pagenumber + 1; i <= end; i++) {
            $pager += "<li data=\"" + i + "\"><a href=\"javascript:void(0)\">" + i + "</a></li>";
        }
        if (pagecount > end) {
            $pager += "<li data=\"0\"><a href=\"javascript:void(0)\">...</a></li>";
        }

        if (pagenumber >= pagecount) {
            $pager += "<li class=\"next disabled\" data=\"" + pagecount + "\"><a href=\"javascript:void(0)\">尾页</a></li>";
        } else {
            $pager += "<li class=\"next\" data=\"" + pagecount + "\"><a href=\"javascript:void(0)\">尾页</a></li>";
        }
        $pager += "</ul>";
        $pager += "</div>";
        $pager += "</div>";
        return $pager;
    }