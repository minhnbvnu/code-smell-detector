function setChaosContainer() {
    if (!IsJsonString($('#currentChaosContainerJsonTextArea').val())) {
        $('#alert_placeholder2').text('JSON syntax not valid.');
    }
    else {
        var oReq = new XMLHttpRequest();
        oReq.open("POST", k8s_url + "/kube/chaos/containers?action=set", true);

        oReq.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                $('#alert_placeholder2').text('New container definition has been saved.');
            }
        };;
        oReq.setRequestHeader("Content-Type", "application/json");
        oReq.send($('#currentChaosContainerJsonTextArea').val());
    }
}