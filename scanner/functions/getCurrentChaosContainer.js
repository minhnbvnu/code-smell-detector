function getCurrentChaosContainer() {
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
        job_parsed = JSON.stringify(JSON.parse(this.responseText), null, 4);
        $('#currentChaosContainerYaml').text(job_parsed);
        $('#currentChaosContainerJsonTextArea').val(job_parsed);
    };;
    oReq.open("GET", k8s_url + "/kube/chaos/containers?action=container_definition");
    oReq.send();
}