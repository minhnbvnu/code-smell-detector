function ajaxPostSuccess(data,elem, e) {
    log(data);
    log(elem);

    if (data.html) {
    elem.replaceWith(data.html);
    }
    if (data.text) {
    elem.find("span").html(data.text).attr('title', data.title);
    } else if (data.title) {
    $(elem).attr('title', data.title);
    }
    if (data.message) {
    flashMessage(elem, data.message);
    }
    if (data.reload || elem.data("reloadAfter")) { /* Refresh page */
    window.location.reload(true);
    }
}