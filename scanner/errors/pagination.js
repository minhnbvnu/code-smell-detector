    function pageAction(dataPage) {
        nowPage = dataPage;
        i_html = '';
        var count = data.count <= 1 ? 1 : data.count ? data.count : 2
        startPage = dataPage - data.count <= 1 ? 1 : dataPage - data.count,
            endPage = dataPage + data.count >= data.totalPage ? data.totalPage : dataPage + data.count,
            prevPage = data.prev ? data.prev : '<',
            nextPage = data.next ? data.next : '>';
        if (dataPage > 1) {
            i_html += '<span id=\"prevPage\">' + prevPage + '</span>'
            if (data.first) {
                i_html += '<a data-page="1" href=\"javascript:void(0);\">首页</a>'
            }
        }
        if (dataPage >= 5) {
            for (var i = 1; i <= 2; i++) {
                i_html += '<a data-page="' + i + '" href=\"javascript:void(0);\">' + i + '</a>'
            }
            i_html += '<span>...</span>'
        }
        for (var j = startPage; j <= endPage; j++) {
            i_html += '<a data-page="' + j + '" href=\"javascript:void(0);\">' + j + '</a>'
        }
        if (endPage + 1 < data.totalPage) {
            i_html += '<span>...</span>'
            for (var i = (endPage > data.totalPage - 2 ? data.totalPage : data.totalPage - 1); i <= data.totalPage; i++) {
                i_html += '<a data-page="' + i + '" href=\"javascript:void(0);\">' + i + '</a>'
            }
            if (data.last) {
                i_html += '<a data-page="' + data.totalPage + '" href=\"javascript:void(0);\">尾页</a>'
            }
            i_html += '<span id=\"nextPage\">' + nextPage + '</span>'
        }
        if (data.showTotalPage && data.totalPage >= 1) {
            i_html += '<i>' + nowPage + '/' + data.totalPage + '</i>'
        }
        if (data.jumpBtn && data.totalPage >= 1) {
            i_html += '前往<input id="pageInput" type="text" />页 <span id="inputGo">确定</span>'
        }
        page.innerHTML = i_html;
        var pageA = page.getElementsByTagName('a');
        for (var i = 0, pageALength = pageA.length; i < pageALength; i++) {
            pageA[i].className = ''
            if (pageA[i].getAttribute('data-page') == dataPage) {
                pageA[i].className = "active"
            }
        }
        // 第一页不请求
        if (!pageOneLoad) {
            callback && callback.call(null, dataPage)
        }
    }