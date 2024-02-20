function runKubeLinter() {
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
        kubelinter = this.responseText;
        $('#alert_placeholder').replaceWith(alert_div + "KubeLinter executed correctly on namespace " + namespace +  ". Changing Regex and activating logs tail.</div>");
        enableLogTail();
        setLogRegex();

        $('#logTailRegex').val('{"since": "60", "pod":".*", "namespace":"' + namespace + '", "labels":".*", "annotations":".*", "containers":".*"}');
        
        if (!log_tail_switch) {
            setLogConsole(); 
        }
    };;

    $('#currentKubeLinterResult').text('KubeLinter launched. Set this regex and start log tail: {"since": "60", "pod":".*", "namespace":"' + namespace + '", "labels":".*", "annotations":".*", "containers":".*"}');

    oReq.open("GET", k8s_url + "/kube/kube-linter?logid=" + random_code +"&namespace=" + namespace);
    oReq.send();
}