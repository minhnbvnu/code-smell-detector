function addAnchor(flexAppUrl)
    {
       if (document.getElementsByName(flexAppUrl).length == 0) {
           getAnchorElement().innerHTML += "<a name='" + flexAppUrl + "'>" + flexAppUrl + "</a>";
       }
    }