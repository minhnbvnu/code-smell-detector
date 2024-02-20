function authorizeUICallback(e) {
        var response = e.source.evalJS('(p = document.getElementById("oauth_pin")) && p.innerHTML;');
        response ? (pin = response.split("<code>")[1].split("</code>")[0], destroyAuthorizeUI(), receivePinCallback()) : (loadingView && loadingView.hide(), loadingContainer && loadingContainer.hide(), webView && webView.show()), loading = !1, clearInterval(intervalID), estimates[estimateID] = (new Date).getTime() - startTime, Ti.App.Properties.setString("Social-LoadingEstimates", JSON.stringify(estimates));
    }