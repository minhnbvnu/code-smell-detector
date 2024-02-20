function keepAliveJobsLogs() {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (!this.responseText.toLowerCase().match(/.*null.*/)) {
                $('#alert_placeholder3').replaceWith(log_tail_alert_no_pixel + this.responseText.replace("nil", "") + '</div>');
            }
        }
    };;
    oReq.open("GET", k8s_url + "/chaos/logs/keepalive?logid=" + random_code + "&pos=" + chaos_logs_pos);
    oReq.send();
}