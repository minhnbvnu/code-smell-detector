function runChaosProgram() {
    chaosProgram = $('#chaosProgramTextArea').val();
    chaosProgramWithCodename = chaosProgram.replace(codename_regex, "chaos-codename: " + codename);
    $('#chaosProgramTextArea').val(chaosProgramWithCodename);
    codename_configured = true;

    var now = new Date().toLocaleString().replace(',','')
    $('#alert_placeholder_programming_mode').replaceWith(alert_div + 'Chaos Program launched at ' + now + ' </div>');

    var oReq = new XMLHttpRequest();
    oReq.open("POST", k8s_url + "/kube/chaos/programming_mode?id=" + random_code, true);
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            now = new Date().toLocaleString().replace(',','')
            $('#alert_placeholder_programming_mode').replaceWith(alert_div + 'Chaos Program completed at ' + now + ' </div>');
        }
    };;
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send($('#chaosProgramTextArea').val());
}