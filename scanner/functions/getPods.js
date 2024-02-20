function getPods() {
    if (chaos_pods) {
        var oReq = new XMLHttpRequest();
        oReq.onload = function () {
            new_pods = JSON.parse(this.responseText)["items"];

            // Pod might just be killed in game, but not terminated in k8s yet.
            for (i=0; i<new_pods.length; i++) {
                if (aliens.some((alien) => alien.name == new_pods[i].name && alien.status == "killed")) {
                    new_pods[i].status = "killed";
                }
            }

            if (nodes && nodes.length > 0) {
                pods = new_pods.concat(nodes);
            } else {
                pods = new_pods;
            }
        };;
        oReq.open("GET", k8s_url + "/kube/pods?action=list&namespace=" + namespace);
        oReq.send();
    }
    else {
        if (nodes && nodes.length > 0) {
            pods = nodes;
        } else {
            pods = [];
        }    
    }
}