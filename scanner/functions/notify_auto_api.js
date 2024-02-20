function notify_auto_api(data, silent_success, silent_failure) {
    if (data.status === 'success') {
        if (silent_success === undefined || silent_success === false) {
            if (data.message.length === 0) {
                data.message = 'Operation succeeded';
            }
            notify_success(data.message);
        }
        return true;
    } else {
        if (data.message.length === 0) {
            data.message = 'Operation failed';
        }
        if (silent_failure === undefined || silent_failure === false) {
            notify_error(data.message);
        }
        return false;
    }
}