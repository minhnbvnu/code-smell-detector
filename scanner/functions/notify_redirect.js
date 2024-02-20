function notify_redirect() {
    if (is_redirect()) {
        swal("You've been redirected",
             "The case you attempted to reach wasn't found.\nYou have been redirected to a default case.",
             "info", {button: "OK"}
             ).then((value) => {
                    queryString = window.location.search;
                    urlParams = new URLSearchParams(queryString);
                    urlParams.delete('redirect');
                    history.replaceState(null, null, window.location.pathname + '?' + urlParams.toString());
                });
    }
}