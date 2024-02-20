function getNamespaces() {
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
        namespaces = this.responseText;
        namespaces = namespaces.split(",");
        namespace = namespaces[namespaces_index];
        console.log("[CURRENT-NAMESPACE] " + namespace);
        $('#currentGameNamespace').text(namespace);
    };;
    oReq.open("GET", k8s_url + "/kube/namespaces");
    oReq.send();
}