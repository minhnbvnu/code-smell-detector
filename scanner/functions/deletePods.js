function deletePods(pod_name) {
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
        $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Kill ' + pod_name + '</div>');
    };;
    oReq.open("GET", k8s_url + "/kube/pods?action=delete&pod_name=" + pod_name + "&namespace=" + namespace);
    oReq.send();
}