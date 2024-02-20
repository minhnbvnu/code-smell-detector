function _get_ws_url(app_path, absolute_url) {
        let protocol = "ws:";
        if (window.location.protocol == "https:")
            protocol = "wss:";
        let loc;
        if (absolute_url != null) {
            loc = document.createElement("a");
            loc.href = absolute_url;
        }
        else
            loc = window.location;
        if (app_path != null) {
            if (app_path == "/")
                app_path = "";
        }
        else
            app_path = loc.pathname.replace(/\/+$/, "");
        return `${protocol}//${loc.host}${app_path}/ws`;
    }