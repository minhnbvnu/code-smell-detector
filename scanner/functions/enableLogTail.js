function enableLogTail() {
    var oReq = new XMLHttpRequest();
    oReq.open("POST", k8s_url + "/kube/chaos/containers?action=enable_log_tail&id=" + random_code, true);
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            $('#alert_placeholder3').replaceWith(log_tail_alert + 'Logs tail started </div>');
        }
    };;
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send("{}");
    setLogRegex();
}