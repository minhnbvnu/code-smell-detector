function startChaosNode(node_name) {
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
        $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Launched chaos job against ' + node_name + '</div>');
    };;
    $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Start chaos job against ' + node_name + '</div>');
    oReq.open("GET", k8s_url + "/kube/chaos/nodes?nodename=" + node_name + "&namespace=" + namespace);
    oReq.send();
}