function ajax_notify_error(jqXHR, url) {
    if (jqXHR.status == 403) {
        message = 'Permission denied';
    } else {
        message = `We got error ${jqXHR.status} - ${jqXHR.statusText} requesting ${url}`;
    }
    notify_error(message);
}