function createUploadAjaxQuery(table, url, isValidateOnly, data, offset, progress, errors, isShowIcons, linkData) {
    var ajaxData = null;

    if(url) {
        ajaxData = {
            type: "POST",
            async: false,
            url: url,
            timeout: 90000,
            success: function(result) {
                parseResults(result, table, progress, errors, isValidateOnly, offset, isShowIcons, linkData);

                if((isValidateOnly === false) && (typeof result.html !== 'undefined')) {
                    post_add_patchup($(document.documentElement), result);
                }
            },
            error: function(data, textStatus, errorThrown) {
                processAjaxError(data, textStatus, errorThrown, progress, errors, offset);
            },
            data: {'data': JSON.stringify(data), 'offset': offset, 'isValidateOnly': isValidateOnly}
        };
    }
    else {
        ajaxData = {
            type: "POST",
            async: true,
            timeout: 90000,
            success: function(result) {
                parseResults(result, table, progress, errors, isValidateOnly, offset, isShowIcons, linkData);

                if((isValidateOnly === false) && (typeof result.html !== 'undefined')) {
                    post_add_patchup($(document.documentElement), result);
                }
            },
            error: function(data, textStatus, errorThrown) {
                processAjaxError(data, textStatus, errorThrown, progress, errors, offset);
            },
            data: {'data': JSON.stringify(data), 'offset': offset, 'isValidateOnly': isValidateOnly}
        };
    }

    return ajaxData;
}