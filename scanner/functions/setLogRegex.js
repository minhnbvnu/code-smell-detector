function setLogRegex() {
    log_tail_div.style.display = "block";
    $('#alert_placeholder3').replaceWith(log_tail_alert + 'Setting regex for filtering log source (by pod name)</div>');
    var oReq = new XMLHttpRequest();
    oReq.open("POST", k8s_url + "/kube/chaos/containers?action=set_log_regex&id=" + random_code, true);
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            $('#alert_placeholder3').replaceWith(log_tail_alert + 'New regex has been configured</div>');
        }
    };;
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send($('#logTailRegex').val());
}