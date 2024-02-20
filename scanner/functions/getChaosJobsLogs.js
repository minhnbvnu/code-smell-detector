function getChaosJobsLogs() {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (log_tail_switch) {
                if (this.responseText.trim() == "null") {
                    document.getElementById("logTailDiv").innerHTML = "Logs has been cleaned...";
                } else {
                    document.getElementById("logTailDiv").innerHTML = "";
                    document.getElementById("logTailDiv").innerHTML = this.responseText;
                }
            }
        }
    };;
    oReq.open("GET", k8s_url + "/chaos/logs?logid=" + random_code + "&pos=" + chaos_logs_pos);
    oReq.send();
    keepAliveJobsLogs();
}