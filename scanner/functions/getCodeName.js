function getCodeName() {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            codename = this.responseText.trim();
            if (codename == "") {
                $('#alert_placeholder').replaceWith(alert_div + 'Error getting codename from backend. </div>');
                codename = "error_fix_getcodename_from_backend";
            }
        }
    };;
    oReq.open("GET", k8s_url + "/codename");
    oReq.send();
}