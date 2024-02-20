function getTotalLogsPos() {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (log_tail_switch) {
                if (this.responseText.trim() == "null") {
                    $('#total_logs_pos').text("0");
                } else {
                    $('#total_logs_pos').text(this.responseText);
                }
            }
        }
    };;
    oReq.open("GET", k8s_url + "/chaos/logs/count?logid=" + random_code);
    oReq.send();
}